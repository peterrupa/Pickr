/*
    Controller for the model class.
*/

import express from 'express';
let router  = express.Router();

import { Class } from '../models';

//GET CLASS
export function getAll(req, res) {
		Class.findAll()
    .then(function(classes) {
        if(classes)
        	res.status(200).send(classes);
        else
        	res.status(404).send(null);
    });
}

export function getOne(req, res) {
    Class.findById(req.params.id).then((classInstance) => {
        if(classInstance) {
        	res.send(classInstance);
        }
        else {
            res.sendStatus(404);
        }
    });
}

//CREATE CLASS
export function insert(req, res) {
    Class.create({
        classCode: req.body.classCode,
        className: req.body.className,
        classSection: req.body.classSection,
    }).then(function(classInstance) {
        if(classInstance)
        	res.status(200).send(classInstance);
        else
        	res.status(404).send(null);
    });
}

//UPDATE CLASS
export function update(req, res) {
    Class.update({
        classCode: req.body.classCode,
        className: req.body.className,
       	classSection: req.body.classSection
    }, {
        where: {
            id: req.params.id
        }
    }).then((affectedCount) => {
        if(affectedCount > 0) {
            // retrieve updated model
            Class.findById(req.params.id).then((updatedClass) => {
                if(updatedClass) {
                    res.send(updatedClass);
                }
                else {
                    res.sendStatus(404);
                }
            });
        }
        else {
            res.send({});
        }
    }).catch((err) => {
        res.sendStatus(500);
    });
}

//DELETE CLASS
export function remove(req, res) {
    // initially get student data
    Class.findById(req.params.id).then((classInstance) => {
        if(classInstance) {
            // remove if found
            classInstance.destroy({
                where: {
                    id: req.params.id
                },
                limit: 1,
                cascade: true
            }).then((affectedCount) => {
                if(affectedCount > 0) {
                    res.send(classInstance);
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
