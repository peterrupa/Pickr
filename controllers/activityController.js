/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

import { Activity } from '../models';

//GET ACTIVITY
export function getAll(req, res) {
		Activity.findAll({
			where: {
				classCode: req.params.id
			}
		})
    .then(function(activities) {
        if(activities)
        	res.send(activities);
        else
        	res.sendStatus(404);
    });
}

export function getOne(req, res) {
    Activity.findById(req.params.activityId)
    .then(function(activity){
    	if(activity)
    		res.send(activity);
    	else
    		res.sendStatus(404);
    });
}
	
//CREATE ACTIVITY
export function insert(req, res) {
    Activity.create({
        activityName: req.body.activityName,
        activityDesc: req.body.activityDesc,
        classCode: req.params.id
    }).then(function(activity) {
        if(activity)
        	res.send(activity);
        else
        	res.sendStatus(404);
    });
}

//UPDATE ATTRIBUTES
export function update(req, res) {
		Activity.update({
				activityName: req.body.activityName,
				activityDesc: req.body.activityDesc
		}, {
		    where: {
		        id: req.params.activityId
		    }
		}).then((affectedCount) => {
		    if(affectedCount > 0) {
		        // retrieve updated model
		        Activity.findById(req.params.activityId).then((activity) => {
		            if(activity) {
		                res.send(activity);
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

//DELETE ACTIVITY
export function remove(req, res) {
    Activity.findById(req.params.activityId).then((activity) => {
        if(activity) {
            // remove if found
            activity.destroy({
                where: {
                    id: req.params.activityId
                },
                limit: 1,
                cascade: true
            }).then((affectedCount) => {
                if(affectedCount > 0) {
                    res.send(activity);
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
