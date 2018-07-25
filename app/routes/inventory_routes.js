var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.get('/inventory_products', (req,res) => {
        db.collection('product_inventory').find({}).toArray((err,result) => {
            if(err)
            {
                
                res.send({'error':'An error occurred while fetching product inventory'});
            }
            else
            {
                res.send(result);
            }
        })
    })

    app.get('/inventory_products/:product_id', (req,res) => {
        console.log(req.params.product_id);
        const id = req.params.product_id ;
        const queryParams = { 'product_id' : (id) };
        db.collection('product_inventory').findOne(queryParams, (err,result) => {
            if(err)
            {
                res.send({'error':'An error occurred while fetching product inventory'});
            }
            else
            {
                res.send(result);
            }
        })
    })

    app.post('/inventory_product', (req, res) => {
        let product = req.body;
        db.collection('product_inventory').insert(product, (err,result) => {
            if (err) { 
                res.send({ 'error': 'An error occurred while insert new product' }); 
            } 
            else {
                res.send(result.ops[0]);
            }
        })
    })

    app.put('/inventory_product/:product_id', (req, res) => {
        const id = req.params.product_id;
        const queryParams = { 'product_id' : (id) };
        let product = req.body;
        db.collection('product_inventory').update(queryParams, product, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error occurred while updating the product' }); 
          } else {
            res.send(product);
          }
        });
      });

      app.delete('/inventory_product/:product_id', (req,res)=>{
        const id = req.params.product_id;
        const queryParams = { 'product_id' : (id) };
        db.collection('product_inventory').remove(queryParams, (err,item)=>{
          if(err)
          { 
            res.send({'error': 'An error occurred while deleting the product'});
          }
          else
          {
            res.send('Product ' + id + ' deleted!');
          }
        });
      });
}