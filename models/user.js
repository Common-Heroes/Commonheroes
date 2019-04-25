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
      validate : {
        isUnique : function(input, cb){
          User.findOne({
            where : {
              username : input.username
            }
          })
            .then(function(found){
              if (found) cb('username sudah dipakai')
              else cb()
            })
            .catch(function(err){
              cb(err)
            })
        }
      }
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
    
      ,beforeFind : function(user){
        const secret = 'commonheroes'
        const hash = crypto.createHmac('sha256', secret)
                           .update(user.password)
                           .digest('hex')
        
        user.password = hash
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