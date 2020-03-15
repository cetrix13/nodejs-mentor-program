import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('UserControler', () => {
    let token;
    beforeEach(async() => {
        const response = await chai.request(app).post('/login').send({ username: 'oleg-pronin' })
            .then(res => res)
            .catch(err => err);
        token = response.text;        
    });
    afterEach(() => {
        //
    });

    test('should return a not-empty list of users', async () => {
        await chai.request(app)
        .get('/users')
        .set('x-access-token', token)
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf.above(0);
        }).catch(function (err) {
            throw err;
        });
    });

    test('should return a specific user', async() => {
        await chai.request(app)
            .get('/users/1')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.all.keys('age', 'id', 'isDeleted', 'login', 'password');
            }).catch(function (err) {
                throw err;
            });
    });
});