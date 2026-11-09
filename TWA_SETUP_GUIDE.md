# Android Trusted Web Activity (TWA) Guide for B & M Crochet House

This project is pre-configured to be packaged as an Android Trusted Web Activity (TWA) for the Google Play Store using Google's official [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap).

---

## 1. Prerequisites
- Node.js 18+ installed
- Java Development Kit (JDK 17+)
- Android SDK command-line tools
- A Google Play Developer account

---

## 2. Generating the Android Package via Bubblewrap

Run the following commands in your terminal:

```bash
# Install Bubblewrap CLI globally
npm install -g @bubblewrap/cli

# Initialize the TWA project pointing to your live production URL
bubblewrap init --manifest=https://your-production-domain.com/manifest.webmanifest

# Or specify your URL directly:
bubblewrap init --manifest=https://bmcrochethouse.com/manifest.webmanifest
```

Bubblewrap will automatically read:
- **Package Name:** `com.bmcrochethouse.twa`
- **Application Name:** `B & M Crochet House`
- **Short Name:** `B&M Crochet`
- **Theme Color:** `#4A2E2B`
- **Background Color:** `#FAF7F2`
- **Icons:** Automatically fetched from `/pwa-512x512.png` and `/pwa-maskable-512x512.png`.

---

## 3. Digital Asset Links (`.well-known/assetlinks.json`)

To remove the Chrome browser URL bar inside the Android app and achieve a 100% native full-screen experience:

1. When Bubblewrap generates your signing keystore (or when you use your Google Play App Signing key), extract the **SHA-256 fingerprint**:
   ```bash
   keytool -list -v -keystore android.keystore -alias android
   ```
2. Open `public/.well-known/assetlinks.json` in this project.
3. Replace the placeholder fingerprint `00:00:00:...` with your real SHA-256 fingerprint:
   ```json
   [
     {
       "relation": ["delegate_permission/common.handle_all_urls"],
       "target": {
         "namespace": "android_app",
         "package_name": "com.bmcrochethouse.twa",
         "sha256_cert_fingerprints": [
           "YOUR_REAL_SHA256_FINGERPRINT_HERE"
         ]
       }
     }
   ]
   ```
4. Deploy the updated `public/.well-known/assetlinks.json` to your live domain so Google Play can verify ownership.

---

## 4. Build Android App Bundle (.aab)

```bash
bubblewrap build
```

This will produce `app-release-bundle.aab`, which you can upload directly to Google Play Console under **Production** or **Internal Testing**.
