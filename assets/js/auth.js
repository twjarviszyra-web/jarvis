/* 
====================================
  JARVIS AUTHENTICATION MANAGER (Global)
  Handles: Login, Signup, Session, Google Auth, Security, Profile
====================================
*/

class AuthService {
    constructor() {
        this.user = null;
        this.currentUserData = null; // Store Firestore user data
        this.isInitialized = false; // Flag to prevent premature redirects
        this.init();
    }

    init() {
        const checkAuth = () => {
            if (window.auth) {
                window.auth.onAuthStateChanged(async (user) => {
                    this.user = user;

                    if (user) {
                        // ADMIN BYPASS or Email Verified Check
                        if (user.email === 'ayush' || user.emailVerified) {
                            console.log("Auth State: Logged In as " + user.email);
                            await this.fetchUserData(user.uid);
                            this.updateUI(true);
                        } else {
                            // User logged in but NOT verified
                            console.log("User not verified.");
                            this.updateUI(false);
                        }
                    } else {
                        console.log("Auth State: Logged Out");
                        this.currentUserData = null;
                        this.updateUI(false);
                    }

                    this.isInitialized = true; // Auth State is now CONFIRMED
                });
            } else {
                setTimeout(checkAuth, 100);
            }
        };
        checkAuth();
    }

    // Fetch user details (Role/Ban Status)
    async fetchUserData(uid) {
        try {
            const doc = await window.db.collection("users").doc(uid).get();
            if (doc.exists) {
                this.currentUserData = doc.data();

                // Security Check: Is Banned?
                if (this.currentUserData.status === 'banned') {
                    alert("SECURITY ALERT: Your access has been revoked by Administrator.");
                    await this.logout();
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    updateUI(isLoggedIn) {
        const navLogin = document.getElementById('nav-login');
        if (navLogin) {
            if (isLoggedIn) {
                navLogin.textContent = "Sign Out";
                navLogin.href = "#";
                navLogin.onclick = (e) => {
                    e.preventDefault();
                    this.logout();
                };
            } else {
                navLogin.textContent = "Login";
                navLogin.href = "login.html";
                navLogin.onclick = null;
            }
        }
    }

    // ENFORCE SECURITY PROTOCOL (Call this on every protected page)
    enforceProtocol() {
        const check = setInterval(() => {
            // Wait until Firebase is loaded AND we have received the first auth state
            if (window.auth && this.isInitialized) {
                clearInterval(check);
                const user = window.auth.currentUser;
                const isAdminSession = sessionStorage.getItem('jarvis_admin');

                // 1. Check if completely logged out (no user object)
                if (!user && !isAdminSession) {
                    console.warn("Unauthorized: No User. Redirecting...");
                    window.location.href = 'login.html';
                    return;
                }

                // 2. Check Verification (Skip for Admin)
                if (user && !user.emailVerified && user.email !== 'ayush' && !isAdminSession) {
                    alert("ACCESS DENIED: Email not verified.\nPlease check your inbox and verify your identity.");
                    window.location.href = 'login.html';
                }
            }
        }, 200);

        // Timeout backup just in case firebase hangs forever
        setTimeout(() => {
            if (!window.auth && !sessionStorage.getItem('jarvis_admin')) {
                // user is offline or blocked, maybe redirect? 
                // window.location.href = 'login.html'; 
            }
        }, 8000);
    }

    // Signup (Email/Pass)
    async signup(name, email, password) {
        try {
            if (password.length < 6) throw new Error("Security Protocol Failed: Password too short.");

            const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Send Verification Email
            await user.sendEmailVerification();

            // Save to Firestore
            await this.saveUserToDB(user, name);

            return user;
        } catch (error) {
            console.error("Signup Error:", error);
            throw new Error(this.formatError(error));
        }
    }

    // Login (Email/Pass)
    async login(email, password) {
        // ADMIN BACKDOOR
        if (email.toLowerCase() === 'ayush' && password === 'ayush12345') {
            sessionStorage.setItem('jarvis_admin', 'true');
            window.location.href = 'admin.html';
            return;
        }

        try {
            const userCredential = await window.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                throw new Error("Email not verified. Please check your inbox.");
            }

            return user;

        } catch (error) {
            console.error("Login Error:", error);
            throw new Error(this.formatError(error));
        }
    }

    // Forgot Password
    async resetPassword(email) {
        try {
            await window.auth.sendPasswordResetEmail(email);
            return "Password reset link sent to your email.";
        } catch (error) {
            console.error("Reset Error:", error);
            throw new Error(this.formatError(error));
        }
    }

    // Google Sign-In
    async loginWithGoogle() {
        try {
            // Google accounts are Auto-Verified
            const result = await window.auth.signInWithPopup(window.googleProvider);
            const user = result.user;

            // Save/Update in Firestore
            await this.saveUserToDB(user, user.displayName || "Google Operative");

            return user;
        } catch (error) {
            console.error("Google Auth Error:", error);
            throw new Error(this.formatError(error));
        }
    }

    // Centralized User Saving
    async saveUserToDB(user, name) {
        const userRef = window.db.collection("users").doc(user.uid);
        const snapshot = await userRef.get();

        if (!snapshot.exists) {
            await userRef.set({
                uid: user.uid,
                name: name,
                email: user.email,
                photoURL: user.photoURL || null,
                role: 'operative', // Default role
                status: 'active',
                joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Update last login
            await userRef.update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }

    // Update Profile (Name, Phone)
    async updateProfile(uid, data) {
        try {
            await window.db.collection("users").doc(uid).update(data);
            if (this.currentUserData && this.currentUserData.uid === uid) {
                this.currentUserData = { ...this.currentUserData, ...data };
            }
            return true;
        } catch (err) {
            console.error("Update Profile Error:", err);
            throw err;
        }
    }

    async logout() {
        try {
            await window.auth.signOut();
            sessionStorage.removeItem('jarvis_admin');
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Logout Error:", error);
        }
    }

    formatError(error) {
        if (error.code === 'auth/operation-not-allowed') return "System Error: Email Auth disabled in configuration.";
        if (error.code === 'auth/email-already-in-use') return "Email already registered.";
        if (error.code === 'auth/user-not-found') return "No account found.";
        if (error.code === 'auth/wrong-password') return "Incorrect Password.";
        return error.message || "Authentication Failed.";
    }

    isAdmin() {
        // Local Admin Session OR Firestore Admin Role
        const sessionAdmin = !!sessionStorage.getItem('jarvis_admin');
        const dbAdmin = this.currentUserData && this.currentUserData.role === 'admin';
        return sessionAdmin || dbAdmin;
    }
}

// Global Instance
window.authService = new AuthService();
