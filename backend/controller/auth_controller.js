import db from "../db_config/db.js";
export const register = async (req, resp) => {
  const { username, email, password, type } = req.body;
  const user = { username, email, password, type };
  let userexist;
  try {
    userexist = await db.isuserexist(email);
  } catch (err) {
    console.log(err);
    resp.status(409).send("User already exist !");
    return;
  }

  if (db.register_user(user)) {
    resp.status(200).send("User registered successfully !!");
    return;
  }

  resp.status(403).send("Error on server !");
};
export const is_user_valid = async (req, resp) => {
  const { email, password, type } = req.body;
  const user = { email, password, type };
  let userexist;
  try {
    userexist = await db.is_user_valid(email, password);
    resp.status(200).send(userexist);
    return;
  } catch (err) {
    resp.status(409).send(err);
    return;
  }

  resp.status(403).send("Error on server !");
};

//get user or product via id or via section(cart,wish,order)
export const get_all_user_or_product = async (req, resp) => {
  let tb = req.params.type;
  console.log(req.params);

  let result;
  if (req.params.id) {
    if (req.params.section) {
      result = await db.get_data_by_id_section(req.params);
      console.log(result);

      let all_pdetails = await Promise.all(
        result.map((ele) => {
          return db.get_data_by_id({ type: "products", id: ele.product_id });
        })
      );
      console.log(".................");

      console.log(all_pdetails[0]);

      resp.status(200).send(all_pdetails);
      return;
    }
    result = await db.get_data_by_id(req.params);
  } else result = await db.getall(tb);

  resp.status(200).send(result);
};

export const add_product = async (req, resp) => {
  const {
    user_id,
    target,
    category,
    available,
    base_price,
    discount,
    description,
    brand,
  } = req.body;
  const product = {
    user_id,
    target,
    category,
    available,
    base_price,
    discount,
    description,
    brand,
  };
  try {
    await db.addproduct(product);
    resp.status(200).send("Product addes successfully !!");
    return;
  } catch (err) {
    console.log("Error while adding...", err);
    resp.status(403).send("Error on server");
    return;
  }
};

export const add_item_to_cart_wishlist_order = async (req, resp) => {
  try {
    await db.add_item_to_cwo(req.params, req.body);
    resp.status(200).send("Item added successfully !!!!");
    return;
  } catch (err) {
    console.log("Error while adding Item...", err);
    resp.status(403).send("Error on server");
    return;
  }
};

const delete_product = async (req, resp) => {
  try {
    await db.delete_product(req.params.product_id);
    resp.status(200).send("Product deleted successfully !!");
    return;
  } catch (err) {
    console.log("Error while deleting...", err);
    resp.status(403).send("Error on server");
    return;
  }
};

const delete_user = async (req, resp) => {
  try {
    await db.delete_user(req.params.user_id);
    resp.status(200).send("User deleted successfully !!");
    return;
  } catch (err) {
    console.log("Error while deleting User..", err);
    resp.status(403).send("Error on server");
    return;
  }
};

const delete_product_from = async (req, resp) => {
  try {
    console.log(req.params);

    await db.delete_product_from(req.params);
    resp.status(200).send("Product deleted successfully !!");
    return;
  } catch (err) {
    console.log("Error while deleting from...", req.params.section, err);
    resp.status(403).send("Error on server");
    return;
  }
};

export const update_user = async (req, resp) => {};
export const update_product = async (req, resp) => {};

export const show_product_category = async (req, resp) => {};
export const show_pruduct_type = async (req, resp) => {};

export default {
  register,
  get_all_user_or_product,
  add_product,
  add_item_to_cart_wishlist_order,
  delete_product,
  delete_product_from,
  delete_user,
  is_user_valid,
};
