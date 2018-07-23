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

    app.post('/inventory_products', (req, res) => {
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

}