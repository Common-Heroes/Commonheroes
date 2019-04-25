'use strict';
const crypto = require('crypto')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type :DataTypes.STRING,
      validate : {
        isEmail : {
          args :true,
          msg :"wrong format email !!!"
        }
      }
    },
    balance: DataTypes.INTEGER,
    username: {
      type : DataTypes.STRING,
      // validate : {
      //   isUnique : 
      //     function(input, cb){
      //     console.log(input, cb, '========= inputvalidator')
      //     User.findOne({
      //       where : {
      //         username : input
      //       }
      //     })
      //       .then(function(found){
      //         console.log(found)
      //         if (found) {
      //           cb('username sudah dipakai')
      //         }
      //         else {
      //           cb()
      //         }
      //       })
      //       .catch(function(err){
      //         cb(err)
      //       })
      //   }
      // }
    },
    password: DataTypes.STRING
  }, {

    hooks : {
      beforeCreate : function(user){
        const secret = 'commonheroes'
        const hash = crypto.createHmac('sha256', secret)
                           .update(user.password)
                           .digest('hex')
        
        user.password = hash
      }
    
      ,beforeFind : function(input){
        console.log('masuk')
        // console.log(input.where.password)
        const secret = 'commonheroes'
        const hash = crypto.createHmac('sha256', secret)
                           .update(input.where.password)
                           .digest('hex')
        console.log(hash)
        input.where.password = hash
      }
      
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Item, {
      foreignKey : 'userId'
    })
    User.hasMany(models.ServiceRecord, {
      foreignKey : 'userId'
    })
  };
  return User;
};