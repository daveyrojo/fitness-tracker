const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`HOLY COW YOU DID IT! ${PORT} BEING USED`);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

app.use(require("./routes/api"));
app.use(require("./routes/htmlroutes"));

//api routes
//workout schema finished
//db running
