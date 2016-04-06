import { Student } from '../models';

export function getAll(req, res) {
    Student.findAll({
    	where:{
    		classCode: req.params.id
    	}
    })
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
    // @TODO: Upload image here
        
    Student.create({
			fname: req.body.fname,
			lname: req.body.lname,
			mname: req.body.mname,
			image: req.body.image,
			classCode: req.params.id	
    }).then((student) => {
        // create tags
        let tags = req.body.tags.map((tag) => student.createTag({
            name: tag
        }));
         
        return Promise.all(tags);
    }).then((student) => {
        res.send(student);
    });
}

//UPDATE ATTRIBUTES
export function update(req, res) {
    // @TODO: Make another function for updating images
    Student.update({
        fname: req.body.fname,
        lname: req.body.lname,
       	mname: req.body.mname,
        image: req.body.image
    }, {
        where: {
            id: req.params.studentId
        }
    }).then((affectedCount) => {
        if(affectedCount > 0) {
            // retrieve updated model
            Student.findById(req.params.studentId).then((student) => {
                if(student) {
                    res.send(student);
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
