/*
    Controller for the model "sample".
*/

var express = require('express');
var router  = express.Router();

// be sure to import your model here
var Sample = require('../models').Sample;

exports.getAll = function(req, res) {
    Sample.findAll()
    .then(function(samples) {
        res.send(samples);
    });
}

exports.insert = function(req, res) {
    Sample.create({
        title: req.body.title,
    }).then(function(sample) {
        res.send(sample);
    });
}