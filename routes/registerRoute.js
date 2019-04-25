const router = require("express").Router()
const Model = require("../models")
const Category = Model.Category
const Item = Model.Item
const Provider = Model.Provider
const ServiceRecord = Model.ServiceRecord
const User = Model.User

router.get ("/" ,(req,res) => {
    res.render("register.ejs")
})

router.post ("/add", (req,res) => {
    User.create ({
        name : req.body.fullName,
        phone : req.body.phoneNumber,
        email : req.body.email,
        username :req.body.userName,
        password : req.body.password,
        balance : req.body.balance
    })
        .then (() => {
            res.redirect("/")
        })
        .catch (err => {
            res.send(err)
            // res.redirect("/register/add?errMsg")
        })
})

module.exports = router