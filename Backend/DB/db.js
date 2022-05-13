const mongoose = require("mongoose");

const establishConnection = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log("Mongo Connected");
    }
  } catch (err) {
    console.log(err);
  }
};

establishConnection();
