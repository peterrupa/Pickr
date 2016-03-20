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
        res.send(classes);
    });
}

export function getOne(req, res) {
    Class.find({ where: {classCode: req.body.classCode} }).on('success', function(classInstance) {
    	res.send(classInstance);
    });
}

//CREATE CLASS
export function insert(req, res) {
    Class.create({
        classCode: req.body.classCode,
        className: req.body.className,
        classDesc: req.body.classDesc,
    }).then(function(classInstance) {
        res.send(classInstance);
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
			}).then(function(classInstance) {});
			res.send(classInstance);
		}
    });
}

//DELETE CLASS
export function deleteClass(req, res) {
    Class.find({ where: {classCode: req.body.classCode} })
    .then(function(classInstance){
        if(classInstance){
					classInstance.destroy()
					.then(function(){
						res.send("Hello");
					});
				}
    });
}
