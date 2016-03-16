/*
    Controller for the model "account".
*/

import express from 'express';
let router  = express.Router();

// be sure to import your model here
import * as error from '../src/constants/ErrorTypes';
import { Account } from '../models';

exports.insert = (req, res) => {
    Account.create({
        fname:        req.body.fname,
        mi:           req.body.mi,
        lname:        req.body.lname,
        username:     req.body.username,
        emailAddress: req.body.email,
        password:     req.body.password
    }).then(function(account) {
        res.status(200).send(account);
    });
}

exports.login = (req, res) => {
    Account.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        if(!user && !req.session.user) {
            res.status(404).send({INV_USER: error.INV_USER});
        } else {
            Account.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            }).then((user) => {
                if(!user && !req.session.user) {
                    res.status(401).send({INV_PASS: error.INV_PASS})
                } else {
                    if (!req.session.user) {
                        req.session.user = req.body.username;
                        res.status(200).send({username:user.dataValues.Username, status:'logged in'});
                    } else {
                        res.status(403).send({UNAUTH: error.UNAUTH});
                    }
                }
            }).catch((err) => {
                res.status(500).send({LOG_FAIL: error.LOG_FAIL});
            });
        }
    }).catch((err) => {
        res.status(500).send({LOG_FAIL: error.LOG_FAIL});
    });
}

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).send({status:'logged out'});
    } else {
        res.status(403).send({UNAUTH: error.UNAUTH});
    }
    
}
