/*
    Controller for the model "activity".
*/

import express from 'express';
let router  = express.Router();

import { Activity } from '../models';

//GET ACTIVITY
export function getAll(req, res) {
        Activity.findAll()
    .then(function(activities) {
        res.send(activities);
    });
}

export function getOne(req, res) {
    Activity.find({ where: {activityId: req.body.activityId} }).on('success', function(activity) {
        res.send(activity);
    });
}

//CREATE ACTIVITY
export function insert(req, res) {
    Activity.create({
        activityId: req.body.activityId,
        activityName: req.body.activityName,
        activityDesc: req.body.activityDesc,
    }).then(function(activity) {
        res.send(activity);
    });
}

//UPDATE ATTRIBUTES
export function update(req, res) {
    Activity.find({ where: {activityId: req.body.activityId} })
    .then(function(activity) {
        if(activity){
            activity.updateAttributes({
                activityId: req.body.activityId,
                activityName: req.body.activityName,
                activityDesc: req.body.activityDesc
            }).then(function(activity) {});
            res.send(activity);
        }
    });
}

//DELETE ACTIVITY
export function deleteActivity(req, res) {
    Activity.find({ where: {activityId: req.body.activityId} })
    .then(function(activity){
        if(activity){
                    activity.destroy()
                    .then(function(){
                        res.send("Hello");
                    });
                }
    });
}