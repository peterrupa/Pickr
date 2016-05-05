// this is a sample test file. All test files should end with .spec.js. It will automatically be tested on rebuild.

import chai from 'chai';

chai.should();

describe('Test Component', () => {
    it('should equal to 1', (done) => {
        let x = 1;

        x.should.equal(1);
        done();
    });
});
