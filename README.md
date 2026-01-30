# JARVIS AI - Official Website

Welcome to the official web portal for JARVIS AI.
A futuristic, glassmorphism-styled website built with pure HTML, CSS, and Vanilla JavaScript.

## 🚀 Features
- **Modern UI**: Dark mode, Glassmorphism, Neon Glow effects.
- **Client-Side Auth**: Simulated Authentication logic (ready for Firebase).
- **Membership System**: Logic to separate Free vs Paid users.
- **Responsive**: Mobile-friendly navigation and layouts.

## 🛠️ Setup Instructions

1.  **Clone/Download** the repository.
2.  **Open** `index.html` in any modern browser.
3.  (Optional) **Deploy** functionality:
    - Edit `assets/js/config.js` to add your real Firebase API keys.
    - Updates `assets/js/auth.js` to switch from Mock to Real Firebase methods.

## 📂 Folder Structure
```
/
├── index.html        # Landing Page
├── login.html        # Auth Portal
├── dashboard.html    # Main User Area (Protected)
├── features.html     # Capabilities List
├── buy.html          # Payment Gateway Mock
├── downloads.html    # File Armory (Protected)
├── profile.html      # User Settings
├── assets/
│   ├── css/
│   │   ├── style.css       # Core Styles
│   │   └── animations.css  # Keyframes
│   ├── js/
│   │   ├── app.js          # (Optional) Global Logic
│   │   ├── auth.js         # Authentication Module
│   │   └── config.js       # Env Variables
```

## 🔒 Security Note
This is a client-side template. For production use:
1.  Enable **Firestore Rules** to protect database records.
2.  Move sensitive logic to **Cloud Functions**.
3.  Never commit real API keys to GitHub.

## 📄 License
MIT License. Free to modify and distribute.
