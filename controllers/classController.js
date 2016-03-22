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
    Class.find({
    	where: {
    		classCode: req.body.classCode
    	}
    }).on('success', function(classInstance) {
    	res.status(200).send(classInstance);
    }).on('error', function(){
    	res.status(404).send(null);
    });
}

//CREATE CLASS
export function insert(req, res) {
    Class.create({
        classCode: req.body.classCode,
        className: req.body.className,
        classDesc: req.body.classDesc,
    }).then(function(classInstance) {
        if(classInstance)
        	res.status(200).send(classInstance);
        else
        	res.status(404).send(null);
    });
}

//UPDATE CLASS
export function update(req, res) {
    Class.find({ where: {classCode: req.body.classCode} })
    .then(function(classInstance) {
    	if(classInstance){
				classInstance.updateAttributes({
					classCode: req.body.classCode,
					className: req.body.className,
					classDesc: req.body.classDesc
				}).then(function(classInstance) {
					if(classInstance)
						res.send(200).send(classInstace);
					else
						res.send(400).send(null);
				});
			} else 
				res.send(400).send(null);
    });
}

//DELETE CLASS
export function deleteClass(req, res) {
    Class.find({ where: {classCode: req.body.classCode} })
    .then(function(classEntity){
        if(classEntity){
					classEntity.destroy()
					.then(function(){
						res.status(200).send("Delete successful");
					});
				} else 
					res.status(404).send("Class not found");
    });
}
