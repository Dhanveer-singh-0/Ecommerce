import mysql from "mysql2";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const caPath = path.join(process.cwd(), "certs", "ca.pem");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(caPath),
  },
});
const connect = () => {
  db.connect((err) => {
    if (err) {
      console.log("Error while connecting to database: ", err);
      return;
    }
    console.log("Successfully connected to database");
  });
  createDB();
};

const createDB = () => {
  let userdb =
    "CREATE TABLE IF NOT EXISTS users(user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(25), email VARCHAR(50) UNIQUE, password VARCHAR(50), type VARCHAR(8))";

  let productdb =
    "CREATE TABLE IF NOT EXISTS products ( user_id INT,product_id INT AUTO_INCREMENT PRIMARY KEY,brand VARCHAR(100), target VARCHAR(8), category VARCHAR(15), available INT(5), base_price INT(7), discount INT(3), description VARCHAR(200), img MEDIUMBLOB, status ENUM('active', 'inactive') DEFAULT 'active', FOREIGN KEY (user_id) REFERENCES users(user_id))";

  let cartdb =
    "CREATE TABLE IF NOT EXISTS carts(cart_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, product_id INT, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (product_id) REFERENCES products(product_id))";

  let wishlistdb =
    "CREATE TABLE IF NOT EXISTS wishlists(wish_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, product_id INT, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (product_id) REFERENCES products(product_id))";

  let paymentsdb =
    "CREATE TABLE IF NOT EXISTS payments(payment_id INT AUTO_INCREMENT PRIMARY KEY, method VARCHAR(20), status VARCHAR(20))";

  let orderdb =
    "CREATE TABLE IF NOT EXISTS orders(order_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, product_id INT, status VARCHAR(15), payment_id INT, address VARCHAR(100), FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (product_id) REFERENCES products(product_id), FOREIGN KEY (payment_id) REFERENCES payments(payment_id))";

  db.query(userdb, (err) => err && console.log("Error creating users:", err));
  db.query(
    productdb,
    (err) => err && console.log("Error creating products:", err)
  );
  db.query(cartdb, (err) => err && console.log("Error creating carts:", err));
  db.query(
    wishlistdb,
    (err) => err && console.log("Error creating wishlists:", err)
  );
  db.query(
    paymentsdb,
    (err) => err && console.log("Error creating payments:", err)
  );
  db.query(orderdb, (err) => err && console.log("Error creating orders:", err));
};
const isuserexist = async (email) => {
  let qry = "select * from users where email=?";

  return new Promise((resolve, reject) => {
    db.query(qry, [email], (err, result) => {
      if (err) {
        console.log("Error checking user exist:", err);
        reject(false);
      }

      if (result.length === 0)
        resolve({ status: true, message: "User not exist.." });

      reject({ status: false, message: "User already exist" });
    });
  });
};
const is_user_valid = async (email, password) => {
  let qry = "select * from users where email=?";

  return new Promise((resolve, reject) => {
    db.query(qry, [email], (err, result) => {
      if (err) {
        console.log("Error checking credentials:", email, err);
        reject(false);
      }
      console.log(result);

      if (result.length === 0)
        reject({ status: false, message: "User not exist.." });
      else if (password === result[0].password)
        resolve({ status: true, user: result[0] });

      reject({ status: false, message: "Incorrect password" });
    });
  });
};
const register_user = (user) => {
  let qry =
    "insert into users(username, email, password, type) values(?,?,?,?)";

  return new Promise((resolve, reject) => {
    db.query(
      qry,
      [user.username, user.email, user.password, user.type],
      (err, result) => {
        if (err) {
          console.log("Error registering user:", err);
          reject(false);
        }
        resolve(true);
      }
    );
  });
};
const addproduct = async (product) => {
  let qry =
    "insert into products(user_id, target, category, available, base_price, discount, description,brand) values(?,?,?,?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    db.query(
      qry,
      [
        product.user_id,
        product.target,
        product.category,
        product.available,
        product.base_price,
        product.discount,
        product.description,
        product.brand,
      ],
      (err, result) => {
        if (err) {
          console.log("Error adding product:", err);
          reject(false);
        }
        resolve(true);
      }
    );
  });
};
const getall = async (type) => {
  let table = type.toLowerCase();
  let qry = "select * from " + table;

  if (table === "products")
    qry =
      "select * from products where status='active' AND user_id IS NOT NULL";

  return new Promise((resolve, reject) => {
    db.query(qry, (err, res) => {
      if (err) console.log("Error fetching", table, err);
      else resolve(res);
    });
  });
};
const get_data_by_id = async (params) => {
  let qry =
    params.type === "users"
      ? "select * from users where user_id="
      : "select * from products where product_id=";

  qry += params.id;

  return new Promise((resolve) => {
    db.query(qry, (err, res) => {
      if (err) console.log("Error fetching by id:", err);
      else {
        resolve(res[0]);
      }
    });
  });
};
const get_data_by_id_section = async (params) => {
  let table = params.section.toLowerCase();
  let qry = `select * from ${table} where user_id=${params.id}`;

  return new Promise((resolve) => {
    db.query(qry, (err, res) => {
      if (err) console.log("Error fetching section", table, err);
      else resolve(res);
    });
  });
};
const update_payment = async (obj) => {
  let qry = "insert into payments(method, status) values(?,?)";

  return new Promise((resolve, reject) => {
    db.query(qry, [obj.method, obj.pstatus], (err, result) => {
      if (err) {
        console.log("Error updating payment:", err);
        reject(false);
      }
      resolve(result.insertId);
    });
  });
};
const add_item_to_cwo = async (params, obj) => {
  let table = params.section.toLowerCase();

  if (table === "orders") {
    let payment_id = await update_payment(obj);

    let qry =
      "insert into orders(user_id, product_id, status, payment_id, address) values(?,?,?,?,?)";

    return new Promise((resolve, reject) => {
      db.query(
        qry,
        [
          params.user_id,
          params.product_id,
          obj.status,
          payment_id,
          obj.address,
        ],
        (err) => {
          if (err) {
            console.log("Error ordering:", err);
            reject(false);
          }
          resolve(true);
        }
      );
    });
  }

  let qry = `insert into ${table}(user_id, product_id) values(?,?)`;

  return new Promise((resolve, reject) => {
    db.query(qry, [params.user_id, params.product_id], (err) => {
      if (err) {
        console.log("Error adding item to", table, err);
        reject(false);
      }
      resolve(true);
    });
  });
};
const delete_product = async (id) => {
  let qry = "update products set status='inactive' where product_id=" + id;

  await delete_product_from({ section: "carts", product_id: id });
  await delete_product_from({ section: "wishlists", product_id: id });

  return new Promise((resolve, reject) => {
    db.query(qry, (err) => {
      if (err) {
        console.log("Error deleting product:", err);
        reject(false);
      }
      resolve(true);
    });
  });
};
const delete_product_from = async (param) => {
  let table = param.section.toLowerCase();
  let qry = `delete from ${table} where product_id=${param.product_id}`;

  if (param.user_id) qry += ` AND user_id=${param.user_id}`;

  return new Promise((resolve, reject) => {
    db.query(qry, (err) => {
      if (err) {
        console.log("Error deleting product from:", table, err);
        reject(false);
      }
      resolve(true);
    });
  });
};
const delete_user_details = async (id) => {
  db.query("delete from orders where user_id=" + id);
  db.query("delete from wishlists where user_id=" + id);
  db.query("delete from carts where user_id=" + id);
  db.query("delete from products where user_id=" + id);
};

const delete_user = async (id) => {
  delete_user_details(id);

  let qry = "delete from users where user_id=" + id;

  return new Promise((resolve, reject) => {
    db.query(qry, (err) => {
      if (err) {
        console.log("Error deleting user:", err);
        reject(false);
      }
      resolve(true);
    });
  });
};

export default {
  connect,
  isuserexist,
  register_user,
  addproduct,
  getall,
  get_data_by_id,
  get_data_by_id_section,
  add_item_to_cwo,
  delete_product,
  delete_product_from,
  delete_user,
  isuserexist,
  is_user_valid,
};
