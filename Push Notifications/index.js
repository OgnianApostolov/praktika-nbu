const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BK8-OxfHyWQ7yqUXRChHTflQU0EOOyIyKG1Si_DvFyYen-s8dP3visgnF49KgVqY9jPLGH6C11etQbrSC-dO14g";
const privateVapidKey = "qrBtJtHiSbv0pSbT_tNycEI4MMtk8i1cr3_L80JriGM";

webpush.setVapidDetails(
  "mailto:lightinthedarkness769@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Appointment created" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));