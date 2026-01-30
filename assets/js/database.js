/* 
====================================
  JARVIS DATABASE SIMULATION
  Handles: User Storage (LocalStorage)
====================================
*/

class Database {
    constructor() {
        this.dbName = 'jarvis_users_db';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.dbName)) {
            localStorage.setItem(this.dbName, JSON.stringify([]));
        }
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }

    saveUser(user) {
        const users = this.getAllUsers();
        // Check if email already exists
        if (users.find(u => u.email === user.email)) {
            throw new Error("User with this email already exists.");
        }
        users.push(user);
        localStorage.setItem(this.dbName, JSON.stringify(users));
        return user;
    }

    getUser(email) {
        const users = this.getAllUsers();
        return users.find(u => u.email === email);
    }

    validateUser(email, password) {
        const user = this.getUser(email);
        if (user && user.password === password) {
            // Return user without password for session
            const { password, ...safeUser } = user;
            return safeUser;
        }
        return null; // Invalid credentials
    }
}

const db = new Database();
