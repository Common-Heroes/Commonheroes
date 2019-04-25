const express = require('express')
const route = express.Router()
const {Category} = require('../models')
const {User} = require('../models')
const {Provider} = require('../models')
const {ServiceRecord} = require('../models')
const {Item} = require('../models')


route.get('/store/:id', function(req, res){
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
    
        let id = req.params.id
        Provider.findByPk(id,
        {hooks : false})
            .then(function(found){
                // console.log(found)
                res.render('providers.ejs',{
                    provider : found
                })
            })
            .catch(function(err){
                console.log(err);
                
                res.send(err)
            })
    }
    
})

route.get('/store/:id/addService', function(req, res){
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
    
        let id = req.params.id
        Provider.findByPk(id,{
            hooks : false
        })
            .then(function(found){
                console.log(found)
                res.render('addService.ejs',{
                    provider : found
                })
            })
            .catch(function(err){
                console.log(err);
                
                res.send(err)
            })
    }

    
})

route.post('/store/:id/addService', function(req, res){
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
    
        res.redirect('/')
    }
})

module.exports = route