const express = require("express");
const app = express();
app.listen(7000);

// user-demo
const userRouter = require("./routes/users");
// channel-demo
const channelRouter = require("./routes/channels");

app.use("/", userRouter);
app.use("/channels", channelRouter);
