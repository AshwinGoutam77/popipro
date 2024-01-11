import firebase from "firebase/app";
import "firebase/messaging";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyAU2N48HBEack3-4u9rSMtuEf-fzKF-oYY",
        authDomain: "popipro-c8d9e.firebaseapp.com",
        projectId: "popipro-c8d9e",
        storageBucket: "popipro-c8d9e.appspot.com",
        messagingSenderId: "903971412602",
        appId: "1:903971412602:web:5b53f4a955ecb6946ab9c3",
        measurementId: "G-HWSNME2FFE",
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              "BAVlWAtpuMABFqapsHuWAgmwZQ877D9KdCDXwSt-OAwYvgk2Db2LPI7WgAySwnA3-ZvXSfxUWxIqSED7d_FogmU",
          });
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
