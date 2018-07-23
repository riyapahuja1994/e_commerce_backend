var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){

    app.get('/products', (req,res) => {
        db.collection('product_inventory').find({},{projection: { _id: 0, product_name: 1, product_image: 1, product_price: 1, product_discount:1 }}).toArray(function(err,result) {
            if(err)
            {
                res.send({'error':'An error occurred while fetching products'});
            }
            else
            {
                console.log(result);
                res.send(result);
            }   
        })
    })

    app.get('/products/:id', (req,res) => {
        const id = req.params.id ;
        const queryParams = { '_id': new ObjectId(id) };
        db.collection('product_inventory').findOne(queryParams,{_id: 0, product_name: 1, product_price: 1, product_discount: 1, product_image: 1, product_details: 1},(err,result) => {
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
    
}