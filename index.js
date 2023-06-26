const express = require("express");
const { connectDb } = require("./config/db");
const user = require("./modules/User/user.routes");
const post = require("./modules/Posts/post.routes");
const categories = require("./modules/Category/category.routes");
const subcategories = require("./modules/SubCategory/subcategory.routes");

const app = express();
const PORT = 8000;
const cors = require("cors");
// const { insertCategories } = require("./modules/Category/insertCategories");

app.use(cors());

app.use(express.json()); // To parse incoming request

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", categories);
app.use("/api/v1", subcategories);



app.use("/api/v1/static", express.static(`${__dirname}/uploads`));

const startServer = async () => {
  try {
    connectDb(
      "mongodb+srv://bhaviklotia22:practice@cluster0.l8kvfnt.mongodb.net/"
    );
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};



startServer();

// insertCategories()
// insertSubcategories()
