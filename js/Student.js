// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ0PlYIIMJOHh2xueY5XdG4hdLu9aQAu0",
    authDomain: "fixme-a1b21.firebaseapp.com",
    databaseURL: "https://fixme-a1b21-default-rtdb.firebaseio.com",
    projectId: "fixme-a1b21",
    storageBucket: "fixme-a1b21.appspot.com",
    messagingSenderId: "522121216989",
    appId: "1:522121216989:web:4834570c0400d50e856c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = ref(database, "users/" + loggedInUserId);
        get(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.val();
                    document.getElementById('loggedUser').innerText = userData.username;
                    document.getElementById('loggedEmail').innerText = userData.email;
                } else {
                    console.log("No Document Found!");
                }
            })
            .catch((error) => {
                console.log("Error Getting Document: ", error);
            });
    } else {
        console.log("User ID not Found!");
    }
});
