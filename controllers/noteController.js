import express from 'express';
let router  = express.Router();

import { Activity, Note } from '../models';

export function insert(req, res) {
  Activity.findById(req.params.ActivityId)
  .then((activity) => {
      if(activity) {
          return activity.createNewNote({
              ActivityId: req.session.activityID,
              note: req.body.note
          });
      }
      else {
          res.sendStatus(400);
      }
  })
  .then((note) => {
  		console.log(note);
      res.send(note);
  })
  .catch((err) => {
  		console.log(err);
      res.sendStatus(500);
  });
}

export function remove(req, res) {
    // initially get activity data
    Note.findById(req.params.noteId).then((note) => {
        if(note) {
            // remove if found
            Note.destroy({
                where: {
                    id: req.params.noteId
                },
                limit: 1,
                cascade: true
            }).then((affectedCount) => {
                if(affectedCount > 0) {
                    res.send(note);
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
