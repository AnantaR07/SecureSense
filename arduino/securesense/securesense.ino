#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <DHT.h>
#include <time.h>

// WiFi & Firebase
#define WIFI_SSID "NANNAN"
#define WIFI_PASSWORD "nannannan"
#define FIREBASE_HOST "sense-20462-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "Gw3cKkWObyN8ms86rSjhJ2UZqdfy7UodAUfihPd4"

// Sensor & Buzzer
#define DHTPIN 4         // D4
#define BUZZERPIN 5      // D1
#define DHTTYPE DHT22

FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastSendMillis = 0;
unsigned long lastCheckMillis = 0;
bool hasSentFromStatus = false;

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(BUZZERPIN, OUTPUT);
  digitalWrite(BUZZERPIN, LOW);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  configTime(7 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  lastSendMillis = millis(); // mulai timer
}

void loop() {
  unsigned long now = millis();

  // Cek setiap 2 detik
  if (now - lastCheckMillis >= 2000) {
    lastCheckMillis = now;

    // Ambil status dari Firebase
    if (Firebase.getBool(firebaseData, "/data/value/status")) {
      bool statusCheck = firebaseData.boolData();

      // Jika status:true dan belum pernah kirim, kirim data langsung
      if (statusCheck && !hasSentFromStatus) {
        kirimData();
        hasSentFromStatus = true;
      }

      // Jika status:false, reset flag
      if (!statusCheck) {
        hasSentFromStatus = false;
      }
    } else {
      Serial.println("❌ Gagal ambil status");
    }

    // Jika sudah 1 jam (3600000 ms), kirim data otomatis
    if (now - lastSendMillis >= 3600000) {
      kirimData();
      lastSendMillis = now;
    }
  }
}

// Fungsi untuk mengirim data
void kirimData() {
  float suhu = dht.readTemperature();
  float kelembaban = dht.readHumidity();

  if (isnan(suhu) || isnan(kelembaban)) {
    Serial.println("Sensor error");
    return;
  }

  String status, kualitas;
  if (suhu > 36) {
    status = "Bahaya";
    kualitas = "Sangat Tidak Baik";
  } else if (suhu > 32) {
    status = "Waspada";
    kualitas = "Tidak Baik";
  } else {
    status = "Aman";
    kualitas = "Baik";
  }

  if (status == "Waspada" || status == "Bahaya") {
    digitalWrite(BUZZERPIN, HIGH);
    delay(5000);
    digitalWrite(BUZZERPIN, LOW);
  }

  time_t nowTime = time(nullptr);
  struct tm *timeinfo = localtime(&nowTime);
  char tanggal[11], waktu[9];
  strftime(tanggal, sizeof(tanggal), "%Y-%m-%d", timeinfo);
  strftime(waktu, sizeof(waktu), "%H:%M:%S", timeinfo);

  String timestamp = String(nowTime);
  String path = "/data/" + timestamp;

  FirebaseJson json;
  json.add("suhu", suhu);
  json.add("kelembaban", kelembaban);
  json.add("status", status);
  json.add("kualitas", kualitas);
  json.add("tanggal", tanggal);
  json.add("waktu", waktu);

  if (Firebase.setJSON(firebaseData, path, json)) {
    Serial.println("✅ Data terkirim ke Firebase.");
  } else {
    Serial.print("❌ Gagal kirim: ");
    Serial.println(firebaseData.errorReason());
  }
}
