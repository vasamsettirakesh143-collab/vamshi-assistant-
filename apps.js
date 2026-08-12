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

    window.location.href =
        `intent://#Intent;package=${APPS[appName]};end`;

    return `Opening ${appName}`;

}