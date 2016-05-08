'use strict';
/*
    Controller for the model "account".
*/

import crypto from 'crypto';
import express from 'express';
import nodemailer from 'nodemailer';
import sequelize from '../tools/sequelize';
let router  = express.Router();

// be sure to import your model here
import * as error from '../src/constants/ErrorTypes';
import { Account } from '../models';

exports.insert = (req, res) => {

    if (!req.body.fname && !req.body.mi && !req.body.lname &&
        !req.body.username && !req.body.email && !req.body.password) {
        res.status(error.INC_DATA.code).send({INC_DATA: error.INC_DATA.message});
    }
    else {
        Account.findOne({
            where: {
                username: req.body.username
            }
        })
        .then((user) => {

            if (user) {
                res.status(error.DUP_ENTRY.code).send({DUP_ENTRY: error.DUP_ENTRY.message});
            }
            else {
                let query = 'INSERT INTO Accounts' +
                            '(fname,mi,lname,emailAddress,username,password,' + 'createdAt,updatedAt) ' +
                            'values(?,?,?,?,?,(SELECT MD5(SHA1(?))),?,?)';

                sequelize.query(query, {
                    replacements:[
                        req.body.fname,
                        req.body.mi,
                        req.body.lname,
                        req.body.email,
                        req.body.username,
                        req.body.password,
                        new Date(),
                        new Date()
                    ],
                    type: sequelize.QueryTypes.INSERT
                })
                .then((account) => {
                    res.status(200).sendStatus(200);
                })
                .catch((err) => {
                    res.status(error.NO_RECORD_CREATED.code).send({NO_RECORD_CREATED: error.NO_RECORD_CREATED.message});
                });
            }
        })
        .catch((err) =>{
            res.status(error.SERVER_ERR.code).send({SERVER_ERR: error.SERVER_ERR.message});
        });
    }
}

exports.login = (req, res) => {
    Account.findOne({
        where: {
            username: req.body.username
        }
    })
    .then((user) => {

        let query = 'SELECT username, id FROM Accounts WHERE ' +
                    'username=? AND password=(SELECT MD5(SHA1(?)))';

        if (!user) {
            res.status(error.INV_USER.code).send({INV_USER: error.INV_USER.message});
        } else {
            sequelize.query(query,{
                replacements: [
                    req.body.username,
                    req.body.password
                ],
                type: sequelize.QueryTypes.SELECT
            })
            .then((user) => {
                if(!user[0]  && !req.session.key){
                    res.status(error.INV_PASS.code).send({INV_PASS: error.INV_PASS.message});
                } else {
                    if (!req.session.key) {
                        req.session.key = user[0].id;
                        res.status(200).send({username:user[0].username, status:'logged in'});
                    } else {
                        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
                    }
                }
            })
            .catch((err) => {
                res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
            });
        }
    });

}


exports.logout = (req, res) => {
    if (req.session.key) {
        req.session.destroy();
        res.status(200).send({status:'logged out'});
    } else {
        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH});
    }
}

exports.forgotPassword = (req, res) => {
    Account.findOne({ where: {EmailAddress: req.body.email} })
    .then((user) => {
        if(user) {
            return user;
        }
        else {
            throw new Error('User not found.');
        }
    })
    .then((user) => {
        if (user) {
            let promise = new Promise((resolve, reject) => {
                crypto.randomBytes(20, (err, buf) => {
                    if (!err) {
                        resolve(buf.toString('hex'));
                    }
                    else {
                        reject(err);
                    }
                });
            });

            promise.then((token) => {

                let message = 'Please click the link provided below to reset'
                    + ' your password: \n' + 'http://localhost:3000/reset/'
                    + token + ' \n  <b>If you did not forget your password,'
                    + ' please disregard this message.</b>';

                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'cmsc128ab3l@gmail.com',
                        pass: 'icsuseruser'
                    }
                });

                let mailOptions = {
                    from: '"Pickr👥" <cmsc128ab3l@gmail.com>',
                    to: user.dataValues.emailAddress,
                    subject: 'Password Reset ✔',
                    text: message,
                    html: message
                };

                let query = 'UPDATE Accounts SET token = ?, tokenExpiry = ' +
                '(SELECT NOW()+INTERVAL 5 HOUR) where emailAddress = ?';

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                    }
                    else {
                        sequelize.query(query,{
                            replacements:[token, user.dataValues.emailAddress],
                            type: sequelize.QueryTypes.UPDATE
                        })
                        .then((status) => {
                            res.sendStatus(200);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.sendStatus(500);
                        });
                    }
                });
            },(err) => {
                console.log(err);
                res.sendStatus(500);
            });

        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
}

exports.resetPassword = (req, res) => {
    Account.findOne({
        where: {
            tokenExpiry: {
                $gt: new Date(),
                $ne: null
            },
            token: {
                $ne: null
            },
            token: req.body.token
        }
    })
    .then((user) => {
        if (!user) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

exports.changePassword = (req, res) => {
    let query = 'UPDATE Accounts SET password = (SELECT MD5(SHA1(?))), ' +
                'token = NULL, tokenExpiry = NULL where token = ?';

    if (req.body.password !== req.body.confirm_password) {
        res.sendStatus(401);
    }
    else {
        Account.findOne({
            where: {
                token: req.body.token
            }
        })
        .then((user) => {
            if (!user) {
                res.sendStatus(404);
            }
            else {
                sequelize.query(query, {
                    replacements: [
                        req.body.password, req.body.token
                    ],
                    type: sequelize.QueryTypes.UPDATE
                })
                .then((response) => {
                    console.log(response);
                    res.sendStatus(200);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                });
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
    }
}
