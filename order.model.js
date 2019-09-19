const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name: String,
    address: String,
    Phonenumber: String,
    total: String
});

module.exports = mongoose.model('Orders', OrderSchema);