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
            username: req.body.username,
            password: req.body.password 
        }
    }).then((user) => {
        if(!user) {
            res.status(404).send(new Error("User does not exist!"));
        } else {
            if (!req.session.user) {
                req.session.user = req.body.username;
                req.session.success = 'You are successfully logged in ' + req.body.username + '!';
            }
            res.redirect('/');
        }
    }).catch((user) => {
        req.session.error = 'Could not log user in. Please try again.';
        res.redirect('/');
    });
}

export function logout(req, res) {
    if (req.session.user) {
        req.session.destroy();
    }
    res.send([{status:'logged out'}]);
}
