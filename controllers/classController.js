/*
    Controller for the model class.
*/

// @TODO: Authentications, Error Messages

import express from 'express';
let router  = express.Router();

import { Class, Account } from '../models';

//GET CLASS
export function getAll(req, res) {
    Class.findAll({
        where: {
            AccountId: req.query.AccountId
        }
    })
    .then(function(classes) {
        if(classes)
        	res.status(200).send(classes);
        else
        	res.status(404).send(null);
    });
}

export function getOne(req, res) {
    Class.find({
    	where: {
    		classCode: req.params.id
    	}
    })
    .then((classInstance) => {
        if(classInstance) {
            res.status(200).send(classInstance);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
    	res.sendStatus(500);
    });
}

//CREATE CLASS
export function insert(req, res) {
    Account.findById(req.body.AccountId)
    .then((account) => {
        if(account) {
            return account.createNewClass({
                className: req.body.className,
                classDesc: req.body.classDesc
            });
        }
        else {
            res.sendStatus(400);
        }
    })
    .then((classInstance) => {
        res.send(classInstance);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

//UPDATE CLASS
export function update(req, res) {
    Class.findById(req.params.id)
    .then((classInstance) => {
        if(classInstance) {
            return classInstance.updateAttributes({
                className: req.body.className,
                classDesc: req.body.classDesc
            });
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((classInstance) => {
        if(classInstance) {
            res.send(classInstance);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

//DELETE CLASS
export function deleteClass(req, res) {
    Class.findById(req.params.id)
    .then((classInstance) => {
        if(classInstance) {
            return classInstance.destroy();
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((classInstance) => {
        res.send(classInstance);
    })
    .catch((err) => {
        res.send(500);
    });    
}
