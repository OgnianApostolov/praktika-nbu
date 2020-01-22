console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Reliance Dental Care Center!",
    icon: "https://i.ibb.co/6H6qwfL/logo.png"
  });
});