/*
    Controller for the model class.
*/

import express from 'express';
let router  = express.Router();

import { Class, Account } from '../models';

//GET CLASS
export function getAll(req, res) {
    Class.findAll({where: {AccountId: req.params.AccountId}})
    .then(function(classes) {
      	if(classes){
      		let promises = classes.map((classData) => {
      			return classData.getActivities().then((activities) => {
							let promises2 =  activities.map((activity) => {
								return activity.getNotes().then((notes) =>{
									activity.dataValues.notes = notes.map((note) => note.dataValues.note);
									return activity.dataValues;
								});
							})
							return Promise.all(promises2)
						}).then((activities) => {
							let notes = [];
							activities.map((activity) => {
								activity.notes.map((note) => {
									notes.push(note);
								});
							});
							classData.dataValues.notes = notes;
							return classData.dataValues;
						});     			
      		});
      		return Promise.all(promises);
      		/*let promises = classes.map((classData) => {
         		return classData.getActivities().then((activities) => {
       				classData.dataValues.activities = activities.map((activity) => {
       					activity.bindNotes();
       					return activity.dataValues;
       				});
       				return classData.dataValues;
       			});
       		});
      		return Promise.all(promises);*/
      	} else {
      		res.sendStatus(400);	
      	}
    })
    .then((classes) => {
    	res.send(classes);
    })
    .catch((err) =>{
    	console.log(err);
    	res.sendStatus(500);
    });
}

export function getOne(req, res) {
    Class.findById(req.params.id)
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
                classCode: req.body.classCode
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
  Class.findById(req.params.id).then((student) => {
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
