/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

import { Class, Activity, Note } from '../models';

//GET ACTIVITY
export function getAll(req, res) {
    Activity.findAll({where:{ClassId: req.params.id}})
    .then((activities) => {
        let promises = activities.map((activity) => {
          return activity.getNotes().then((data) => {
              activity.dataValues.notes = data.map((note) => note.dataValues.note);
              return activity.dataValues;
          });
      	}); 
      	
      	return Promise.all(promises);
    })
    .then((activities) => {
    	res.send(activities);
    });
}

export function getOne(req, res) {
    Activity.findById(req.params.activityId).then(function(activity){
    	if(activity){
    		activity.getNotes().then((data) => {
            activity.dataValues.notes = data.map((note) => note.dataValues.note);
            
            res.send(activity);
        });
    	}
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
    // initially get activity data
    Activity.findById(req.params.activityId).then((activity) => {
        if(activity) {
            // remove if found
            Activity.destroy({
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
