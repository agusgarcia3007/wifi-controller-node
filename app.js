const app = require("express")();
const wifi = require("node-wifi");
require("dotenv").config();

app.use(require("body-parser").json());

wifi.init({
  debug: true,
  iface: null,
});

app.get("/api/networks", (req, res) => {
  wifi.scan((error, networks) => {
    if (!networks) res.status(500).send(error);
    res.send(networks);
  });
});

app.get("/api/mynetwork", (req, res) => {
  wifi.getCurrentConnections((error, currentConnections) => {
    if (error) res.status(500).send(error);
    res.send(currentConnections);
  });
});

app.post("/api/connect", (req, res) => {
  const { ssid, password } = req.body;
  wifi.connect({ ssid, password }, (error) => {
    if (error) res.status(500).send(error);
    console.log("Connected");
    res.send("Connected");
  });
});

app.post("/api/disconnect", (req, res) => {
  if (!req.body) res.status(400).send("Invalid Parameters");
  if (process.platform === "darwin")
    res.status(500).send("Not supported on Mac OS");

  const ssid = req.body;
  wifi.disconnect(ssid, (error) => {
    if (error) res.json({ error });
    res.send("Disconnected");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} ✨`);
});
