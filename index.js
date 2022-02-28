const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3390;
const app = express();
const url = "mongodb://localhost/INEC";

mongoose.connect(url).then(() => {
  console.log("database now connected...!");
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.end("This is a very simple API");
});

app.use("/api", require("./router/userRouter"));
app.use("/api/president", require("./router/presidentRouter"));
app.use("/api/vicePresident", require("./router/vicePresidentRouter"));
app.use("/api/publicity", require("./router/publicityRouter"));
app.use("/api/welfare", require("./router/welfareRouter"));
app.use("/api/treasurer", require("./router/treasurerRouter"));

app.listen(port, () => {
  console.log(`server is now live: post ${port}`);
});
