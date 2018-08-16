var ObjectId = require("mongodb").ObjectID;

module.exports = function(app, db) {
  app.get("/products", (req, res) => {
    db.collection("product_inventory")
      .find(
        {},
        {
          projection: {
            _id: 0,
            product_id: 1,
            product_name: 1,
            product_image: 1,
            product_price: 1,
            product_discount: 1
          }
        }
      )
      .toArray(function(err, result) {
        if (err) {
          res.send({ error: "An error occurred while fetching products" });
        } else {
          console.log(result);
          res.send(result);
        }
      });
  });

  app.get("/products/:product_id", (req, res) => {
    const id = req.params.product_id;
    const queryParams = { product_id: id };
    db.collection("product_inventory").findOne(
      queryParams,
      {
        projection: {
          _id: 0,
          product_id: 1,
          product_name: 1,
          product_image: 1,
          product_category: 1,
          product_details: 1,
          product_price: 1,
          product_discount: 1
        }
      },
      (err, result) => {
        if (err) {
          res.send({
            error: "An error occurred while fetching product inventory"
          });
        } else {
          res.send(result);
        }
      }
    );
  });

  app.post("/products", (req, res) => {
    let product = req.body;
    db.collection("product_cart").insert(product, (err, result) => {
      if (err) {
        res.send({ error: "An error occurred while inserting new product" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete("/products/:product_id", (req, res) => {
    const id = req.params.product_id;
    const queryParams = { product_id: id };
    db.collection("product_cart").remove(queryParams, (err, item) => {
      if (err) {
        res.send({
          error: "An error occurred while deleting product from your cart."
        });
      } else {
        res.send("Product deleted from your cart!");
      }
    });
  });
};
