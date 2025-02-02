import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

class FirestoreDB {
    constructor() {
        this.db = null;
        this.isAvailable = false;
    }

    open() {
        return new Promise((resolve, reject) => {
            const firebaseConfig = {
                apiKey: "AIzaSyDtd1mscSEASGcrxMkw5FhUhfEU4aOfKMA",
                authDomain: "restaurantapp-dc52f.firebaseapp.com",
                projectId: "restaurantapp-dc52f",
                storageBucket: "restaurantapp-dc52f.firebasestorage.app",
                messagingSenderId: "767732177892",
                appId: "1:767732177892:web:aa423590280198806bc5f1"
              };

            try {
                const app = initializeApp(firebaseConfig);
                this.db = getFirestore(app);
                this.isAvailable = true;
                resolve();
            } catch (error) {
                console.error("Error initializing Firestore:", error);
                reject(error.message);
            }
        });
    }

    add(name, email, message) {
        if (!this.isAvailable) {
            return Promise.reject("Firestore not available.");
        }

        const contactCollection = collection(this.db, "ContactList");
        const contact = { name, email, message, timestamp: new Date() };

        return addDoc(contactCollection, contact)
            .then((docRef) => {
                console.log("Firestore record added with ID:", docRef.id);
                return contact;
            })
            .catch((error) => {
                console.error("Error adding to Firestore:", error);
                throw error;
            });
    }
}

export default new FirestoreDB();
