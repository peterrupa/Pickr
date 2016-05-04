'use strict';
/*
    Controller for the model "account".
*/

import express from 'express';
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
                            '(fname,mi,lname,emailAddress,username,password) ' +
                            'values(?,?,?,?,?,(SELECT MD5(SHA1(?))))';

                sequelize.query(query, {
                    replacements:[
                        req.body.fname,
                        req.body.mi,
                        req.body.lname,
                        req.body.email,
                        req.body.username,
                        req.body.password
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
    req.session.something = true;

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
