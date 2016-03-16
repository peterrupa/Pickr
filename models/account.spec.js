import chai from 'chai';
import request from 'supertest';

const should = chai.should();
const assert = chai.assert;

let api = request.agent("localhost:8000/");

function login (expectedStatusCode, username, password) {
    return api.post('/api/account/login')
            .send('username=' + username + '&password=' + password)
            .expect(expectedStatusCode);
}

function logout () {
    return api.get('/api/account/logout');
}

function normalLogout () {
    return logout()
            .end((err,res) => {
                should.not.exist(err);
                should.exist(res);
                done();
            });
} 

describe('Login', () => {
    it('should login if the username and password match is correct', () => {
        login(200,'PJHRobles','ultimatesecret')
            .end((err,res) => {
                should.not.exist(err);
                should.exist(res);
            });
        normalLogout();
    });

    it('should allow case-insensitive login', () => {
        login(200,'PJHRobles','ultimatesecret')
            .end((err,res) => {
                should.not.exist(err);
                should.exist(res);
            });
        normalLogout();
    });

    it('should fail if a session already exists', () => {
        login(200,'PJHRobles','ultimatesecret');
        login(403,'test','ultimatesecret');
        normalLogout();
    });

    it('should fail if the password is incorrect', () => {
        
    });

    it('should fail if the username and password is not in the database', () => {
        
    });
});

describe('Logout', () => {
    it('should login if the username and password match in the database', () => {
        
    });

    it('should fail if the username and password does not match in the database', () => {
        
    });

    it('should fail if the username and password is not in the database', () => {
        
    });
});
