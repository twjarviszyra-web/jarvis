/* 
====================================
  JARVIS CONFIGURATION
====================================
*/

const config = {
    appName: "JARVIS AI",
    version: "2.0.0",
    api: {
        firebaseConfig: {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "SENDER_ID",
            appId: "APP_ID"
        }
    },
    pricing: {
        amount: 499,
        currency: "INR"
    }
};

// Prevent modification
Object.freeze(config);
