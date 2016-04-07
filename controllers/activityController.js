/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

import { Class, Activity } from '../models';

//GET ACTIVITY
export function getAll(req, res) {
    Activity.findAll({where:{ClassId: req.params.id}})
    .then(function(activities) {
        if(activities)
        	res.send(activities);
        else
        	res.sendStatus(400);
    });
}

export function getOne(req, res) {
    Activity.find({
    	where: {
    		activityId: req.params.activityId
    	}
    }).then(function(activity){
    	if(activity)
    		res.send(activity);
    	else
    		res.sendStatus(404);
    });
}

//CREATE ACTIVITY
export function insert(req, res) {
  Class.findById(req.params.id)
  .then((classData) => {
      if(classData) {
          return classData.createNewActivity({
              ClassId: classData.id,
              activityName: req.body.activityName,
              activityDesc: req.body.activityDesc
          });
      }
      else {
          res.sendStatus(400);
      }
  })
  .then((activity) => {
      res.send(activity);
  })
  .catch((err) => {
      res.sendStatus(500);
  });
}
//UPDATE ATTRIBUTES
export function update(req, res) {
    Activity.findById(req.params.activityId)
    .then((activity) => {
        if(activity) {
            return activity.updateAttributes({
              activityName: req.body.activityName,
              activityDesc: req.body.activityDesc
            });
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((activity) => {
        if(activity) {
            res.send(activity);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}


//DELETE ACTIVITY
export function remove(req, res) {
    Activity.findById(req.params.id)
    .then((activity) => {
        if(activity) {
            return classInstance.destroy();
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((activity) => {
        res.send(activity);
    })
    .catch((err) => {
        res.send(500);
    });
}
