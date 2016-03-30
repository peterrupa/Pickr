/*
    Controller for the model "sample".
*/

import express from 'express';
let router  = express.Router();

// be sure to import your model here
import { Sample } from '../models';

export function getAll(req, res) {
    Sample.findAll()
    .then(function(samples) {
        res.send(samples);
    });
}

export function insert(req, res) {
    Sample.create({
        title: req.body.title,
    }).then(function(sample) {
        res.send(sample);
    });
}