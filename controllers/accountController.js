/*
    Controller for the model "account".
*/

import express from 'express';
let router  = express.Router();

// be sure to import your model here
import { Account } from '../models';

export function insert(req, res) {
    Account.create({
        fname: req.body.fname,
        mi: req.body.mi,
        lname: req.body.lname,
        username: req.body.username,
        emailAddress: req.body.email,
        password: req.body.password
    }).then(function(account) {
        res.send(account);
    });
}

export function login(req, res) {
    Account.findOne({
        where: {
            username: req.body.username
        }
    }).then((user) => {
        console.log(user.username);
        if(!user) {
            res.status(404).send(new Error("User does not exist!"));
        } else {
            Account.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            }).then((userwithpw) => {
                if(!userwithpw) {
                    res.status(401).send(new Error("Incorrect password!"));
                } else {
                    if (!req.session.user) {
                        req.session.user = req.body.username;
                        req.session.success = 'You are successfully logged in ' + req.body.username + '!';
                        res.status(200).send(userwithpw);
                    } else {
                        req.session.error = 'Someone is currently logged in.';
                        res.status(403).send(new Error("Forbidden!"));
                    }
                }
            }).catch((err) => {
                console.log(err);
                req.session.error = 'Login Failed. Please try again';
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        console.log(err);
        req.session.error = 'Login Failed. Please try again';
        res.status(500).send(err);
    });
}

export function logout(req, res) {
    if (req.session.user) {
        req.session.destroy();
    }
    res.send([{status:'logged out'}]);
}
