/*
    Controller for the model "student".
*/

import {Class, Student } from '../models';

export function getAll(req, res) {
    Student.findAll({where:{ClassId: req.params.id }})
    .then((students) => {
        // fetch tags for each student
        let promises = students.map((student) => {
            return student.getTags().then((data) => {
                student.dataValues.tags = data.map((tag) => tag.dataValues.name);

                return student.dataValues;
            });
        });

        return Promise.all(promises);
      })
      .then((students) => {
          res.send(students);
      });
}

//GET Student
export function getOne(req, res) {
    Student.findById(req.params.studentId).then((student) => {
        if(student) {
            student.getTags().then((data) => {
                student.dataValues.tags = data.map((tag) => tag.dataValues.name);

                res.send(student);
            });
        }
        else {
            res.sendStatus(404);
        }
    });
}

//CREATE Student
export function insert(req, res) {
    // @TOOD: Upload image here
    Class.findById(req.params.id)
    .then((classData) => {
        if(classData) {
            return classData.createNewStudent({
              ClassId: classData.id,
              fname: req.body.fname,
              lname: req.body.lname,
              mname: req.body.mname,
              image: req.body.image,
              tags: req.body.tags
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
    // @TODO: Make another function for updating images
    Student.findById(req.params.studentId)
    .then((student) => {
        if(student) {
            return student.updateAttributes({
              fname: req.body.fname,
              lname: req.body.lname,
             	mname: req.body.mname,
            });
        }
        else {
            res.sendStatus(404);
        }
    })
    .then((student) => {
        if(student) {
            res.send(student);
        }
        else {
            res.sendStatus(400);
        }
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

//DELETE Student
export function remove(req, res) {
    // initially get student data
    Student.findById(req.params.studentId).then((student) => {
        if(student) {
            // remove if found
            Student.destroy({
                where: {
                    id: req.params.studentId
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
