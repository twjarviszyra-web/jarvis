// Firebase Compat Libraries (Global Namespace) for file:// support
// This defines 'firebase' globally

const firebaseConfig = {
    apiKey: "AIzaSyAWJTxlI-Hl5CXP029tI4hcIVEG6LTvp8s",
    authDomain: "jarvis-550c3.firebaseapp.com",
    projectId: "jarvis-550c3",
    storageBucket: "jarvis-550c3.firebasestorage.app",
    messagingSenderId: "91527527471",
    appId: "1:91527527471:web:65a77d65bd691e4f5d5ada",
    measurementId: "G-15G5ZJM5T5"
};

// Initialize only if not already done
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export globals for other scripts
window.auth = firebase.auth();
window.db = firebase.firestore();
window.googleProvider = new firebase.auth.GoogleAuthProvider();

console.log("Firebase Initialized (Compat Mode)");
