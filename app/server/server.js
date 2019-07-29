const express = require("express");
const app = express();
const db = require("./config/db");
const middleware = require("./middleware/middewares");

db()
  .then(() => {
    console.log("MONGODB Connected");
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

middleware(app);

const users = require("./routes/users");
const admins = require("./routes/admin");
const auth = require("./routes/auth");

app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/admins", admins);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API Server Started at port ${port}`);
});
