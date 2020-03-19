import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('AuthController', () => {

    test('should return a authorization token', (done) => {
        chai.request(app)
            .post('/login')
            .send({ username: 'oleg-pronin' })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.a('string');
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });
});