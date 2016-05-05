import chai from 'chai';
import request from 'supertest';
import error from './../src/constants/ErrorTypes';

const should = chai.should();
const assert = chai.assert;
const api    = request.agent('localhost:8000');
