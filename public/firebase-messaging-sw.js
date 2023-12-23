importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyD-EsiZWKHkAkXfOhU_yrvxOYRRbQmgalk",
  authDomain: "jobpth-d5ee3.firebaseapp.com",
  projectId: "jobpth-d5ee3",
  storageBucket: "jobpth-d5ee3.appspot.com",
  messagingSenderId: "139282922448",
  appId: "1:139282922448:web:c660a26bc5054957f3d7d5",
  measurementId: "G-PV1Z0SV9VF",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
