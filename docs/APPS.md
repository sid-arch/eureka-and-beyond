# Desktop and Android apps

The apps are thin native shells around the website. They open the live site in a native window (macOS and Windows) or a native activity (Android), so every lesson, simulation, account and progress feature works exactly as on the web, and content updates reach the apps without a new release. Each app bundles one small local page, `apps/assets/offline.html`. It is the launcher, and the screen shown when the device is offline or the site can't be reached.

| Platform | Tooling | Output | Where it's built |
| --- | --- | --- | --- |
| macOS 10.15+ (Apple silicon and Intel) | Tauri 2 (`apps/desktop`) | `.dmg` | GitHub Actions, macOS runner (a .dmg can only be built on a Mac) |
| Windows 10/11 x64 | Tauri 2 (`apps/desktop`) | NSIS installer `.exe` | GitHub Actions, Windows runner; also cross-compiled on Linux (see below) |
| Android 6.0+ | Capacitor 7 (`apps/android`) | `.apk` | GitHub Actions, Linux runner; or any machine with the Android SDK |

## Which site the apps open

`apps/app-config.json` sets the app name, id (`dev.eurekaandbeyond.app`), version and `url`. It currently points at **staging** (`https://staging.eureka-and-beyond.pages.dev`), because the redesigned site is not on production yet. When production is switched over, change `url` to the production address and rebuild; or set `APP_URL` when building, or type it into the workflow's `app_url` box. The URL must be https.

## Building on GitHub (all three)

`.github/workflows/apps.yml`:
- **Actions → Build apps → Run workflow** builds the .dmg, .exe and .apk; download them from the run's Artifacts.
- **Pushing a tag** such as `git tag v1.0.0 && git push --tags` builds all three and attaches them to a GitHub Release.

### Signing

Without signing, the apps still install, but:
- **macOS:** the first open needs right-click → Open (or System Settings → Privacy & Security → Open Anyway), because the app isn't notarized.
- **Windows:** SmartScreen shows "Windows protected your PC" → More info → Run anyway.
- **Android:** users must allow installing from their browser or file manager.

To remove these prompts, add repository secrets:
- **Android:** `ANDROID_KEYSTORE_BASE64` (the release keystore, base64-encoded) and `ANDROID_KEYSTORE_PASSWORD`. Key alias: `eureka`.
- **macOS:** an Apple Developer ID certificate and notarization credentials: `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`, `APPLE_ID`, `APPLE_PASSWORD` (an app-specific password) and `APPLE_TEAM_ID`. This requires a paid Apple Developer account.
- **Windows:** code signing needs a certificate from a certificate authority. See the Tauri docs on Windows code signing; it isn't wired up yet.
- **Google Play:** upload an `.aab` (`./gradlew bundleRelease`), not an `.apk`.

## Building locally

Android (needs JDK 21 and the Android SDK with platform 35):

```sh
cd apps/android
npm install
npm run sync                      # writes www/ and capacitor.config.json, copies them into android/
cd android && ./gradlew assembleDebug    # app/build/outputs/apk/debug/app-debug.apk
```

Icons and splash screens come from `apps/android/assets/` (`npx @capacitor/assets generate --android`).

Desktop (needs Rust and Node):

```sh
cd apps/desktop
npm install
npm run prepare-web
npx tauri build                   # on a Mac: .app and .dmg; on Windows: .exe and .msi
```

To cross-compile the Windows installer on Linux, install `nsis`, `lld` and `llvm`, then:

```sh
rustup target add x86_64-pc-windows-msvc
cargo install cargo-xwin
npx tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc --bundles nsis
```

Icons come from `apps/assets/icon.png` (`npm run icons`).

## Security notes

- The desktop app exposes no native commands to web content: `capabilities/default.json` grants nothing.
- Android allows navigation only to the configured site's host and blocks mixed content.
- Sign-in uses the site's own secure cookies inside the app's web view, so there's nothing app-specific to configure on the server.
