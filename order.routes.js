module.exports = (app) => {
    const orders = require('./order.controller.js');

    const users = require('./user.js');
    // Create a new order
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Retrieve a single order with orderId
    app.get('/orders/:orderId', orders.findOne);

    // Update a Note with orderId
    app.put('/orders/:orderId', orders.update);

    // Delete a Note with orderId
    app.delete('/orders/:orderId', orders.delete);


}