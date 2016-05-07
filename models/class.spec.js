// @TODO: Me

import chai from 'chai';
import request from 'supertest';
import error from './../src/constants/ErrorTypes';

const should = chai.should();
const assert = chai.assert;
const api    = request.agent("localhost:8000");

function createClass(expectedStatusCode, className, classDesc, AccountId) {
    return api.post('/api/class/')
            .send('className=' + className + '&classDesc=' + classDesc)
            .expect(expectedStatusCode);
}

function getClasses(expectedStatusCode, accountId) {
    return api.get('/api/class?AccountId=' + accountId).send()
            .expect(expectedStatusCode);
}

describe('Create Account', () =>{
    let className = 'Class' + Math.floor(Math.random()*10000);
  
    it('should successfully create a class if all values are present', (done) => {
        createClass(200, className, 'Test Class', 99)
            .end((err,res) => {
                should.not.exist(err);
                done();
            });
    });
    
    it('should return an error if the parameters are incomplete', (done) => {
        createClass(401, 'ErrorClass')
            .end((err,res) => {
                done();
            });
    });
});