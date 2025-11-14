import express from "express";
import auth from "./controller/auth_controller.js";
import db from "./db_config/db.js";
import cors from "cors";
import multer from "multer";
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
app.use(express.json());
db.connect();

app.post("/register", auth.register); //add user
app.post("/checkcredentials", auth.is_user_valid); //add user

app.get("/:type", auth.get_all_user_or_product); //all user or products
app.get("/:type/:id", auth.get_all_user_or_product); //user or product by id
app.get("/:type/:id/:section", auth.get_all_user_or_product); // get cart/wish/order

app.post("/addproducts", upload.single("image"), auth.add_product); //add product
app.post(
  "/users/:user_id/:section/:product_id",
  auth.add_item_to_cart_wishlist_order
); // add to cart/wish/order

app.delete("/users/:user_id", auth.delete_user); //delete user
app.delete("/users/products/:product_id", auth.delete_product); //delete product
app.delete("/users/:user_id/:section/:product_id", auth.delete_product_from); //delete product from

app.listen(5000, () => {
  console.log("Server started.....");
});
