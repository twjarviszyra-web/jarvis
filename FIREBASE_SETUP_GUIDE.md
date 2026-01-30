# 🔥 FIREBASE SETUP GUIDE (REQUIRED)

## The Problem
You are seeing `auth/operation-not-allowed`. This means Firebase has **blocked** new signups because you haven't turned on the switch yet.

## The Fix (Do involved steps)

1.  **Go to Firebase Console**:
    -   Open [https://console.firebase.google.com/](https://console.firebase.google.com/)
    -   Click on your project **"JARVIS"** (or `jarvis-550c3`).

2.  **Go to Authentication**:
    -   On the left sidebar, click **Build** -> **Authentication**.
    -   Click the **Sign-in method** tab.

3.  **Enable Email/Password**:
    -   Click on **"Email/Password"**.
    -   Turn the **"Enable"** switch **ON**.
    -   (Optional) Turn "Email link (passwordless sign-in)" **OFF**.
    -   Click **Save**.

4.  **Enable Google (If needed)**:
    -   If Google Sign-In gave an error, click **"Google"** in the list.
    -   Turn **"Enable"** switch **ON**.
    -   Select your **Project Support Email** from the dropdown.
    -   Click **Save**.

## Email Templates (Customization)
-   Go to **Authentication** -> **Templates** tab.
-   You can edit the text for "Email address verification" and "Password reset" here.
-   This is where you set the "Sender Name" to **JARVIS**.

## Restart
-   Once saved, go back to your website and try to **Sign Up** again. It should work instantly!
