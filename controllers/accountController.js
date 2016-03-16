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
