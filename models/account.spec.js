import chai from 'chai';
import request from 'supertest';
import error from './../src/constants/ErrorTypes';

const should = chai.should();
const assert = chai.assert;
const api    = request.agent("localhost:8000");

function createAccount (expectedStatusCode, fname, mi, lname, username, email, password) {
    return api.post('/api/account/createAccount')
            .send('fname=' + fname + '&mi=' + mi + '&lname=' + lname + '&username=' + username + '&email=' 
            + email + '&password=' + password)
            .expect(expectedStatusCode);
}

function login (expectedStatusCode, username, password) {
    return api.post('/api/account/login')
            .send('username=' + username + '&password=' + password)
            .expect(expectedStatusCode);
}

function logout (expectedStatusCode) {
    return api.get('/api/account/logout').expect(expectedStatusCode);
}

describe('Create Account', () =>{
    let randomUser = 'user' + Math.floor(Math.random()*10000);
  
    it('should successfully create an account if all values are present', (done) => {
        createAccount(200, 'Name', 'M', 'Last', randomUser, 'test@test.com', 'useruser')
            .end((err,res) => {
                should.not.exist(err);
                done();
            });
    });
    
    it('should return an error if the parameters are incomplete', (done) => {
        createAccount(401, 'testuser', 'test@test.com', 'useruser')
            .end((err,res) => {
                done();
            });
    });
    
    it('should return an error if there exist another username in the database', (done) => {
        createAccount(401, 'Paul Joshua', 'H', 'Robles', 'PJHRobles', 'joshuahrobles@gmail.com', 'ultimatesecret')
            .end((err,res) => {
                done();
            });
    });
});

describe('Login', () => {
    it('should login if the username and password match is correct', (done) => {
        login(200,'PJHRobles','ultimatesecret')
            .end((err,res) => {
                should.not.exist(err);
                logout(200)
                    .end((err,res) => {
                        should.not.exist(err);
                        done();
                    });
            });
    });

    it('should allow case-insensitive login', (done) => {
        login(200,'PJhROBleS','ultimatesecret')
            .end((err,res) => {
                should.not.exist(err);
                logout(200)
                    .end((err,res) => {
                        should.not.exist(err);
                        done();
                    });
            });
    });

    it('should fail if a session already exists', (done) => {
        login(200,'PJHRobles','ultimatesecret')
            .end((err,res) => {
                should.not.exist(err);
                login(403,'test','ultimatesecret')
                    .end((err,res) => {
                        should.exist(res);
                    });
                logout(200)
                    .end((err,res) => {
                        should.not.exist(err);
                        done();
                    });
            });
    });

    it('should fail if the password is incorrect', (done) => {
        login(401, 'PJHRobles', 'notasecret')
            .end((err,res) => {
                done();
            });
    });

    it('should fail if the username and password is not in the database', (done) => {
        login(404, 'notausername', 'notapassword')
            .end((err,res) => {
                done();
            }); 
    });
});

describe('Logout', () => {
    it('should logout normally', (done) => {
        login(200, 'PJHRobles', 'ultimatesecret')
            .end((err,res) => {
                logout(200)
                    .end((err,res) => {
                        should.not.exist(err);
                        done();
                    });
            });
    });

    it('should not logout when no one is logged in', (done) => {
        logout(403)
            .end((err,res) => {
                done();
            });
    });
});
