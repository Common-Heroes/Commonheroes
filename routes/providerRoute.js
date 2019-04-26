const express = require('express')
const route = express.Router()
const {Category} = require('../models')
const {User} = require('../models')
const {Provider} = require('../models')
const {ServiceRecord} = require('../models')
const {Item} = require('../models')
const Clc = require('../helpers/calculate')

let payService = null

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
                // console.log(err);
                
                res.send(err)
            })
    }
    
})

route.get('/store/:id/addService', function(req, res){
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
        
        let provider = null
        let id = req.params.id
        Provider.findByPk(id,{
            hooks : false
        })
            .then(function(found){
                payService = found.price
                provider = found
                return Item.findAll({
                    where: {
                         userId : req.session.userId,
                         status : 'rusak' 
                        }
                    })
                
            })
            .then(function(found){

                res.render('addService.ejs',{
                    provider : provider,
                    userId : req.session.userId,
                    listItem : found,
                    msg : req.query.Msg
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
        
        let objItem = null
        let idItem = req.body.item
        let checkInDate = new Date()
        let random = Clc('+', Math.round(Math.random()), 5)
        let id = req.params.id
        let obj = {
            userId : req.session.userId,
            providerId : id,
            createdAt : new Date,
            updatedAt : new Date,
            checkIn : 'today',
            checkOut : random + 'days later'
            // checkIn : `${checkInDate.getFullYear()}/${checkInDate.getMonth()+1}/${checkInDate.getDate()}`,
            // checkOut :  `${checkInDate.getDate()+random}/${checkInDate.getMonth()+1}/${checkInDate.getFullYear()}`
        }
        console.log(obj.checkIn, obj.checkOut)
        Item.findOne({ 
            where : {
                id : idItem,
                userId : req.session.userId
            }
        })
        .then(function(found){
            objItem = found
            return User.findByPk(req.session.userId,{
                hooks : false
            })
        })
        .then(function(found){
            return User.update({
                balance : Clc('-', found.dataValues.balance, payService)
            },{
                where : {
                    id : req.session.userId
                }
            })
        })
        .then(function(){
            return User.findByPk(req.session.userId,{
                hooks : false
            })
        })
        .then(function(found){
            if (found.balance < 0){
                User.update({
                    balance : Clc('+', found.dataValues.balance, payService)
                },{
                    where : {
                        id : req.session.userId
                    }
                })
                    .then(function(){
                        res.redirect(`/provider/store/${id}/addService?Msg=` + 'MAAF ! uang anda tidak cukup, silahkan cari store lain yang lebih murah')
                    })
                    .catch(function(err){
                        res.send(err)
                    })
            } else {
                Item.update({
                    status : 'ongoing service'
                }, {
                    where : {
                        id : objItem.id
                    }
                })
                .then(function(){
                    return ServiceRecord.create(obj)
                })
                .then(function(){
                    res.redirect(`/provider/store/${id}/addService?Msg=` + 'TERIMA KASIH ! item anda sudah masuk ke daftar ONGOING SERVICE, dan Uang anda sudah berkurang !')
                })
                .catch(function(err){
                    res.send(err)
                })
            }
        })
        .catch(function(err){
            res.send(err)
        })
    
    }
})

module.exports = route