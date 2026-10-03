# FitFlow Store Assets

Prepared brand assets are original geometric artwork. They are not evidence of a store upload. Generate them again, if needed, with `python scripts/generate_assets.py` after installing Pillow in a Python environment; Python is not required to run the Expo app.

| Folder | Contents / intended use |
| --- | --- |
| icons/ | fitflow-play-icon.png, 512 × 512 RGB PNG; app-store listing icon |
| screenshots/ | Actual captured app screenshots; label web previews separately from Android device evidence |
| feature-graphics/ | fitflow-feature.png, 1024 × 500 RGB PNG; prepared Play feature graphic |

Runtime launcher assets are assets/icon.png (1024 × 1024), assets/adaptive-icon.png (transparent 1024 × 1024 foreground with centered safe-area mark), and assets/splash.png. Android supplies the adaptive background from app.json.

## Required screen captures

Capture Home Dashboard, AI Workout, Progress, Community, and Nutrition on a real Android device running the actual APK. Use realistic sample data. Also capture Privacy Policy and any required profile/settings/test evidence. Capture the upper and lower portions where a feature requires scrolling. Do not put private data or credentials in screenshots.

Use screenshots/web/ only for **actual browser previews** captured from the running app. Browser screenshots are not Android screenshots, APK-installation evidence, Play Console evidence, or proof of a signed build. Replace/supplement them with device captures for the lab submission as required.

Review current [Google Play asset requirements](https://support.google.com/googleplay/android-developer/answer/9866151?hl=en) before upload: the listing icon is 512 × 512 and the feature graphic is 1024 × 500 without alpha. The prepared files meet these dimensions; remaining content/device-specific requirements need manual review. iOS screenshots must be captured for appropriate Apple device sizes if iOS distribution is undertaken.

Never fabricate build results, Play Console screens, or TestFlight screenshots.
