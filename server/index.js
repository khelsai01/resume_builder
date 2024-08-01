const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const resumeRouter = require("./routes/resume.routes");
const userRouter = require("./routes/user.routes");
const auth = require("./middleware/auth.middleware");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/resume',auth, resumeRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connectDB();
  console.log(`server is run at port http://localhost:${port}`);
});
