const User = require('./user.model.js');


// Find a single order with a orderId
exports.findOne = (req, res) => {
    console.log(req.params); 
User.find(req.params.username)
    .then(data => {
        if(data.length>0){
            var passwordHash = data[0].password;
            compare(req.body.password, passwordHash, function(err, result) {
                if(err){
                    console.log(err);
                    return;
                }
                if(result){
                    resp.send(data);
                    return;
                }
            });
        }
    });
};

