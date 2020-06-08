var Mock = require('mockjs');
var express = require('express');

var random = Mock.Random;
var router = express.Router();

router.use('/',function(req,res){
    var data = Mock.mock({
        "errorMsg": "@string",
        'list|1-10':[
            {
                'id|+1': 1,
                'name': random.name(),
                'title': random.cname(),
                'time': random.datetime(),
                'address': random.region(),
                'finished': Boolean
            }
        ]
    })
    return res.json(data);
})

router.use('/login',function(req,res){
    return Mock.mock({
        status: 200,
        message: '@cname(4,9)'
    })
})

module.exports = router;