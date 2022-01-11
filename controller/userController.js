const express = require('express')
const route = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../models');
const userController = require('../controller/userController');
const validator = require('fastest-validator')

const v = new validator();

const schema = {
    name: { type: "string", min: 3, max: 255, optional: false },
}


exports.signup = (req,res) => {
 
    db.user.findOne( {
        where: {
            email: req.body.email
        }
    }).then((result) => {
        if (result) {
            res.status(409).json({
                message : 'Email already exist'
            })
        } else {
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(req.body.password,salt, (err,hash) => {
                   
                        const user = {
                            name : req.body.name,
                            email : req.body.email,
                            password : hash,
                            contact : parseInt(req.body.contact)
                        };
                        const validationResponse = v.validate(user, schema)
                        if (validationResponse === true) {
                            db.user.create(user).then((data) => {
                                res.send('Registeration Successful')
                            }).catch(err => {
                                res.send("error" + err)
                            })        
                        } else {
                            res.json({
                                message : validationResponse[0].message
                            });
                        }
                });
            });
        }
    }).catch(err => {
        res.status(500).json({
            message : 'Something went wrong'
        });
    });
}

exports.login = (req,res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    }).then((userresult) => {
        if(userresult === null ) {
            res.status(401).json({
                message: "Invalid Credential"
            });
        } else {
            bcrypt.compare(req.body.password, userresult.password, (err,result) => {
                if(result) {
                    const token = jwt.sign({
                        email : userresult.email,
                        userId : userresult.id,
                        expiresIn: "24h"
                    }, 'secret', (error,token) => {
                        res.status(200).json({
                            message: "Authentication Successful",
                            token: token
                        })
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid Credential!"
                    });
                }
            })
        }
    }).catch((err) => {
        res.status(500).json({
            message: 'something went wrong'
        })
    })
}


// exports.tokenfunc = async () => {
//     const token = await jwt.sign({
//         email: "rutu@gmail.com",
//         userId: 4
//     }, "HeyThereIAmSecretKey")
//     console.log(token);

//     const userver = jwt.verify(token, "HeyThereIAmSecretKey")
//     console.log(userver);
// }
