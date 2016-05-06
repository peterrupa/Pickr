'use strict';
/*
    Controller for the model "account".
*/

import crypto from 'crypto';
import express from 'express';
import nodemailer from 'nodemailer';
let router  = express.Router();

// be sure to import your model here
import * as error from '../src/constants/ErrorTypes';
import { Account } from '../models';
import sequelize from '../tools/sequelize';
import store from '../tools/store';
import { sessionId } from '../app';

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
    if(!sessionId) res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
    else {
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
            }
            else {
                sequelize.query(query,{
                        replacements: [
                            req.body.username,
                            req.body.password
                        ],
                        type: sequelize.QueryTypes.SELECT
                    })
                    .then((user) => {
                        if(!user[0]){
                            res.status(error.INV_PASS.code).send({INV_PASS: error.INV_PASS.message});
                        } else {
                            let checkSession = 'SELECT data FROM Sessions ' +
                             'AS Session WHERE Session.sid = ?';

                            sequelize.query(checkSession, {
                                replacements: [
                                    sessionId
                                ],
                                type: sequelize.QueryTypes.SELECT
                            })
                            .then((session) => {
                                let setSession = 'INSERT INTO Sessions (sid,expires,data,createdAt,updatedAt) ' +
                                'VALUES (:sid, NOW() + INTERVAL 5 HOUR, :data, NOW(), NOW())';
                                if(!session[0]){
                                    req.session.key =  user[0].id;
                                    let sessionData = JSON.stringify(req.session).replace(/\\/g, '');
                                    sequelize.query(setSession,{
                                        replacements: {
                                            sid : sessionId,
                                            data: sessionData
                                        },
                                        type: sequelize.QueryTypes.INSERT
                                    })
                                    .then((success) => {
                                        console.log(user[0].id);
                                        res.status(200).send(req.session);
                                    })
                                    .catch((err) => {
                                        res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
                                    });
                                } else {
                                    let updateSession = 'UPDATE Sessions SET ' +
                                    'data = :data, expires = NOW() + INTERVAL 5 HOUR, updatedAt = NOW() ' +
                                    ' WHERE sid = :sid';
                                    let sesh = Object.assign({}, session[0]);
                                    let sessionData = [sesh.data.slice(0, 138), ",\"key\":\"", user[0].id, "\"}"].join('');
                                    sessionData = sessionData.replace(/^"/, "");
                                    sessionData = sessionData.replace(/"$/, "");

                                    sequelize.query(updateSession,{
                                        replacements: {
                                            data: sessionData,
                                            sid : sessionId
                                        },
                                        type: sequelize.QueryTypes.UPDATE
                                    })
                                    .then((success) => {
                                        req.session.key =  user[0].id;
                                        res.status(200).send(success);
                                    })
                                    .catch((err) => {
                                        res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
                                    });
                                }

                            })
                            .catch((err) => {
                                res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
                    });
                }
        });
    }
}

exports.logout = (req, res) => {
    if(!sessionId) res.status(error.LOG_FAIL.code).send({LOG_FAIL: error.LOG_FAIL.message});
    else{
        let checkSession = 'SELECT data FROM Sessions ' +
         'AS Session WHERE Session.sid = ?';

        sequelize.query(checkSession, {
            replacements: [
                sessionId
            ],
            type: sequelize.QueryTypes.SELECT
        })
        .then((session) => {
            if(!session[0]){
                res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
            } else{
                let sessionData = JSON.parse(session[0].data);
                if(sessionData.key){
                    let deleteSession = 'DELETE FROM Sessions WHERE sid = ?';
                    sequelize.query(deleteSession,{
                        replacements: [
                            sessionId
                        ],
                        type: sequelize.QueryTypes.DELETE
                    })
                    .then((success) => {
                        res.status(200).redirect('/login');
                    })
                    .catch((err) => {
                        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
                    });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
        });
    }
}

exports.forgotPassword = (req, res) => {

    Account.findOne({ where: {EmailAddress: req.body.email} })
    .then((user) => {
        if(user) {
            return user;
        }
        else {
            res.sendStatus(404);
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
                res.sendStatus(500);
            });

        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
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
                'token = NULL, tokenExpiry = NULL where emailAddress = ?' +
                ' AND username = ?';

    if (req.body.password !== req.body.confirm_password) {
        res.sendStatus(401);
    }
    else {
        Account.findOne({
            where: {
                username: req.body.username,
                emailAddress: req.body.email
            }
        })
        .then((user) => {
            if (!user) {
                res.sendStatus(404);
            }
            else {
                sequelize.query(query, {
                    replacements: [
                        req.body.password, req.body.email, req.body.username
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
