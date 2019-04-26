const router = require("express").Router()
const Model = require("../models")
const Category = Model.Category
const Item = Model.Item
const Provider = Model.Provider
const ServiceRecord = Model.ServiceRecord
const User = Model.User


// edit profile feature

//edit user profile
router.get ("/edit", (req,res)=> {
    //mengedit profil siuser tersebu
    let id =  req.session.userId
    if (!req.session.userId) {
        res.redirect('/login')}
    else {
        // res.send ('ini diedit profil')
        // res.render('editprofile.ejs')
        // console.log (id)
        User.findByPk (id,{
            hooks :false
        })
            .then (found => {
                console.log (found,'================')
                // res.send(found)
                res.render ("editprofile.ejs", {
                    userData : found
                })
            })
            .catch (err=> {
                res.send(err)  
            })
    }
})


router.post( "/edit", (req,res) => {
    if (!req.session.userId) {
        res.redirect('/login')}
    else {
        let updateObj = {
            name : req.body.name,
            email: req.body.email,
            phone : req.body.phoneNumber,
        }

        User.update(updateObj,{
            where : {
                id : req.session.userId
            }
        })
        
        .then ( success => {
            res.redirect("/profile")
        })
        .catch (err => {
            res.send (err)
        })
    }
})

//item list of item
router.get ("/item", (req,res)=> {
    //user id dibutuhkan didalam sini
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
        
        let id = req.session.userId
        // res.send ('list of item')
        Item.findAll ()
    
        .then ( data => {
            // console.log (data)
            // res.send (data)
            res.render("profileListItem.ejs", {
                userItem :data
            })
        })
        .catch ( err => {
            res.send (err)
        })
    }
})

//edit users item

router.get ("/addItem", (req,res) => {
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
        
        res.render ("addItem.ejs")
    }
})

router.post ("/addItem", (req,res)=> {
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
        
        let itemObj = {
            name : req.body.itemName,
            status: "rusak",
            userId : req.session.userId
        }
    
        Item.create (itemObj)
        .then (success => {
            // console.log (itemObj)
                res.redirect("/profile")
            })
            .catch (err => {
                res.send (err)
            })
    }
})

//profile info
router.get ("/", (req,res)=> {
    //find all user`s item and show it
    //find users data
    if(!req.session.userId){
        res.redirect("/login/")
    } else {
        
        res.render ("profile.ejs")
    }
})

// profile delete akun
router.get ("/delete", (req,res)=> {
    User.destroy({
        where : {
            id : req.session.userId
        }
    })

    .then(success => {
        res.redirect("/login")
    })
    .catch ( err => {
        res.send (err)
    })
})

//profile log out
router.get ("/logout", (req,res)=> {
    req.session.destroy()
        res.redirect('/')
})



module.exports = router