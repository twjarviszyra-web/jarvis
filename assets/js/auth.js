/* 
====================================
  JARVIS AUTHENTICATION MANAGER
  Handles: Login, Signup, Session
====================================
*/

class AuthService {
    constructor() {
        this.userKey = 'jarvis_user';
    }

    // SIMULATED LOGIN - In production, replace with Firebase.auth().signInWithEmailAndPassword
    login(email, password) {
        return new Promise((resolve, reject) => {
            console.log("Authenticating...");
            setTimeout(() => {
                // Mock logic
                if (email.includes("@") && password.length > 5) {
                    const user = {
                        uid: "user_" + Math.random().toString(36).substr(2, 9),
                        name: email.split("@")[0],
                        email: email,
                        type: "free", // Default to free
                        joined: new Date().toISOString()
                    };
                    this.saveSession(user);
                    resolve(user);
                } else {
                    reject("Invalid credentials. Password must be 6+ chars.");
                }
            }, 1500); // Fake network delay
        });
    }

    // SIMULATED GOOGLE LOGIN
    loginWithGoogle() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = {
                    uid: "google_" + Math.random().toString(36).substr(2, 9),
                    name: "Google User",
                    email: "user@gmail.com",
                    type: "free",
                    joined: new Date().toISOString()
                };
                this.saveSession(user);
                resolve(user);
            }, 1500);
        });
    }

    logout() {
        localStorage.removeItem(this.userKey);
        window.location.href = 'index.html';
    }

    saveSession(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getSession() {
        return JSON.parse(localStorage.getItem(this.userKey));
    }

    isAuthenticated() {
        return !!this.getSession();
    }

    // ADMIN ONLY: Mock upgrade
    upgradeUser() {
        const user = this.getSession();
        if (user) {
            user.type = 'paid';
            this.saveSession(user);
            return true;
        }
        return false;
    }

    // Guard for protected pages
    checkProtect() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }
}

const auth = new AuthService();
