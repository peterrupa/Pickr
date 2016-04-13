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
            AccountId: req.params.AccountId
        }
    })
    .then(function(classes) {
        if(classes)
        	res.send(classes);
        else
        	res.sendstatus(404);
    });
}

export function getOne(req, res) {
    Class.findById(req.params.id)
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
    Account.findById(req.params.AccountId)
    .then((account) => {
        if(account) {
            return account.createNewClass({
                className: req.body.className,
                classCode: req.body.classCode
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
export function remove(req, res) {
  CLass.findById(req.params.id).then((student) => {
      if(student) {
          // remove if found
          Class.destroy({
              where: {
                  id: req.params.id
              },
              limit: 1,
              cascade: true
          }).then((affectedCount) => {
              if(affectedCount > 0) {
                  res.send(student);
              }
              else {
                  res.send({});
              }
          });
      }
      else {
          res.sendStatus(404);
      }
  });
}