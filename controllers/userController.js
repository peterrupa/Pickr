/*
    Controller for the model "user".
*/

import express from 'express';
import expressSession from 'express-session';

let router  = express.Router();

import { User } from '../models';

export function login(req, res) {
    User.findOne({
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