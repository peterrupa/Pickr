/*
    Controller for the model "account".
*/

import express from 'express';
let router  = express.Router();

// be sure to import your model here
import * as error from '../src/constants/ErrorTypes';
import { Account } from '../models';

exports.insert = (req, res) => {

    if (!req.body.fname && !req.body.mi && !req.body.lname && !req.body.username
    && !req.body.email && !req.body.password) {
        res.status(error.INC_DATA.code).send({INC_DATA: error.INC_DATA.message});
    }

    Account.findOne({
        where: {
            username: req.body.username
        }
    })
    .then((user) => {
        if(user) {
            res.status(error.DUP_ENTRY.code).send({DUP_ENTRY: error.DUP_ENTRY.message});
        } else {
            Account.create({
                fname:        req.body.fname,
                mi:           req.body.mi,
                lname:        req.body.lname,
                username:     req.body.username,
                emailAddress: req.body.email,
                password:     req.body.password
            })
            .then((account) => {
                res.status(200).send(account);
            })
            .catch((err) => {
                res.status(error.NO_RECORD_CREATED.code).send({NO_RECORD_CREATED: error.NO_RECORD_CREATED.message});
            });
        }
    }).catch((err) =>{
        res.status(error.SERVER_ERR.code).send({SERVER_ERR: error.SERVER_ERR.message});
    });
}

exports.login = (req, res) => {

    Account.findOne({
        where: {
            username: req.body.username
        }
    })
    .then((user) => {

        if(!user && !req.session.key) {
            res.status(error.INV_USER.code).send({INV_USER: error.INV_USER.message});

        } else {

            Account.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then((user) => {

                if(!user && !req.session.key) {
                    res.status(error.INV_PASS.code).send({INV_PASS: error.INV_PASS.message})
                }
                else {

                    if (req.session && req.session.key) {
                        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
                    }
                    else {
                        req.session.key = user.dataValues.username;
                        res.status(200).send(req.session);
                    }

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

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}
