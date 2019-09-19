const Order = require('./order.model.js');

//Create new Order
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Create a Order
    const order = new Order({
        name: req.body.name || "No order name", 
        address: req.body.address,
        Phonenumber: req.body.Phonenumber,
        total: req.body.total
    });

    // Save order in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the order."
        });
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving order with id " + req.params.orderId
        });
    });
};

// Update a order
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Find and update order with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        title: req.body.name || "No customer name", 
        address: req.body.address,
        Phonenumber: req.body.Phonenumber,
        total: req.body.total
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.orderId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    });
};