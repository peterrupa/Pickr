/*
    Controller for the model "student".
*/

import { Class, Student, Tag } from '../models';

import Jimp from 'jimp';
import fs from 'fs-promise';

import * as error from '../src/constants/ErrorTypes';

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
    let file = req.file;

    // query class
    processImg(file).then((img) => {
        return Class.findById(req.params.id);
    })
    // insert student
    .then((classData) => {
        if(classData) {
            let image;

            if(file) {
                image = file.filename + '.jpg';
            }
            else {
                image = null;
            }

            return classData.createNewStudent({
              ClassId: classData.id,
              fname: req.body.fname,
              lname: req.body.lname,
              mname: req.body.mname,
              image: image,
              tags: req.body.tags.split(',')
            });
        }
        else {
            res.sendStatus(404);
        }
    })
    // respond
    .then((student) => {
        res.send(student);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
}

function processImg(file) {
    if(!file) {
        return Promise.resolve(null);
    }
    else {
        // resize
        return Jimp.read(file.path)
        .then((img) => {
            return img.cover(300, 300)
            .write('public/uploads/' + file.filename + '.jpg');
        })
        // remove original file
        .then(() => {
            return fs.unlink(file.path);
        })
    }
}

//UPDATE ATTRIBUTES
export function update(req, res) {
    let file = req.file;
		
    // query class
    processImg(file).then((img) => {
        return Student.findById(req.params.studentId);
    })
    .then((student) => {
    		return Tag.destroy({
            where: {
                StudentId: student.id
            },
        }).then((affectedCount) => {
        	if(file) {
            let image = file.filename + '.jpg';

            return student.updateStudent({
                fname: req.body.fname,
                lname: req.body.lname,
                mname: req.body.mname,
                tags: req.body.tags.split(','),
                image, 
                
            });
		      }
		      else {
		          return student.updateStudent({
		              fname: req.body.fname,
		              lname: req.body.lname,
		              mname: req.body.mname,
		              tags: req.body.tags.split(',')
		          });
        	}
        });
    })
    .then((student) => {
        if(student) {
        	res.send(student);
        }
        else res.sendStatus(400);
    })
    .catch((err) => {
    		console.log(err);
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

export function fetchAllBySession(req, res) {
    if(!req.session.key){
        res.status(error.UNAUTH.code).send({UNAUTH: error.UNAUTH.message});
    } else {
        Student.findAll({where:{ClassId: req.session.classID }})
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
}
