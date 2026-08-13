const APPS = {

    whatsapp: "com.whatsapp",

    instagram: "com.instagram.android",

    youtube: "com.google.android.youtube",

    calculator: "com.google.android.calculator",

    settings: "com.android.settings"

};


function isAndroidChrome() {

    return /Android/i.test(navigator.userAgent);

}

function openApp(appName) {

    appName = appName.toLowerCase();

    if (!APPS[appName]) {

        return "Sorry, I cannot open that app yet.";

    }

    if (!isAndroidChrome()) {

        return `Opening ${appName} is only supported on Android Chrome right now.`;

    }

    const pkg = APPS[appName];

    const fallback = encodeURIComponent(
        `https://play.google.com/store/apps/details?id=${pkg}`
    );

    // action + category tell Android to launch the app's own launcher
    // activity directly. Without these, Android can't resolve which
    // screen to open and falls back to a Play Store search instead.
    window.location.href =
        `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${pkg};S.browser_fallback_url=${fallback};end`;

    return `Opening ${appName}`;

}
