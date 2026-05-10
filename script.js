// 🔥 MODE
let mode = "admin";

// 🔥 CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyBeVhVdbJt3D3fY2DYeTqNOMaORaw3PB2k",
    authDomain: "login-admin-10bbb.firebaseapp.com",
    databaseURL: "https://login-admin-10bbb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "login-admin-10bbb",
    storageBucket: "login-admin-10bbb.firebasestorage.app",
    messagingSenderId: "1038539552023",
    appId: "1:1038539552023:web:4cca203467d692df603352",
    measurementId: "G-JHLDBHFT9T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* 🔁 SWITCH TAB */
function switchTab(selected) {
    mode = selected;

    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));

    if (selected === "admin") {
        document.querySelectorAll(".tab")[0].classList.add("active");
        document.getElementById("desc").innerText = "Login sebagai Admin untuk akses dashboard";
        document.getElementById("loginForm").style.display = "block";
    } else {
        document.querySelectorAll(".tab")[1].classList.add("active");
        document.getElementById("desc").innerText = "Pegawai tidak perlu login";
        document.getElementById("loginForm").style.display = "none";
    }
}

/* 🔐 LOGIN ADMIN */
function login() {

    if (mode !== "admin") {
        alert("Pegawai tidak perlu login!");
        return;
    }

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Isi username & password!");
        return;
    }

    db.ref("users").once("value")
    .then(snapshot => {

        let found = false;

        snapshot.forEach(child => {
            const data = child.val();

            console.log(data); // debug

            if (
                data.username === username &&
                data.password === password &&
                data.role === "admin"
            ) {
                found = true;
                window.location.href = "https://dasboard-admin-5og6.vercel.app/";
            }
        });

        if (!found) {
            alert("Login gagal!");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Firebase error!");
    });
}


/* 👨‍⚕️ PEGAWAI */
document.getElementById("userBtn").onclick = function() {
    window.location.href = "https://dasboard-karyawan.vercel.app/";
};