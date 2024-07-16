const express = require("express");
const app = express();
const port = 3000;

const numberRouter = require("./routes/numberroutes");

app.use("/numbers", numberRouter);

app.listen(port, () => {
  console.log(`App has started `);
});
