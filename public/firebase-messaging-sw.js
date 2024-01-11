importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAU2N48HBEack3-4u9rSMtuEf-fzKF-oYY",
  authDomain: "popipro-c8d9e.firebaseapp.com",
  projectId: "popipro-c8d9e",
  storageBucket: "popipro-c8d9e.appspot.com",
  messagingSenderId: "903971412602",
  appId: "1:903971412602:web:5b53f4a955ecb6946ab9c3",
  measurementId: "G-HWSNME2FFE",
};

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
  if (!payload.hasOwnProperty("notification")) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      image: payload.data.image,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  event.waitUntil(clients.openWindow(payload.data.click_action));
});
