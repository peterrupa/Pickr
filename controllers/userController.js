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
            res.status(403).send(new Error("User does not exist!"));
        } else {
            store.Session.findOne({
                where: {
                    sid: req.sessionID
                }
            }).then((session) => {
                return user;
            }).catch((err) => {
                return null;
            });
        }
    });
}

export function logout(req, res) {

}