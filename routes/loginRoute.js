const express = require('express')
const route = express.Router()
const {Category} = require('../models')
const {User} = require('../models')
const {Provider} = require('../models')
const {ServiceRecord} = require('../models')
const {Item} = require('../models')

route.get('/', function(req, res){
    res.render('login.ejs', {
        error : req.query.errMsg
    })
})

route.post('/', function(req, res){
    User.findOne({
        where : {
            username : req.body.username,
            password : req.body.password
        },
        // hooks :false
        // hook: false
    })         
        .then(function(found){
            console.log (found)
            
            if(found){
                // res.send (found)
                res.redirect('/profil', {
                    loginData :found
                })
            }
            else{
                res.redirect('/login/?errMsg= wrong username / password')
            }
        })
        .catch(function(err){    
            console.log(err)        
            res.send(err)
        })

})

module.exports = route