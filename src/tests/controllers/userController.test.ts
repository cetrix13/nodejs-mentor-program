import 'dotenv/config';
import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testUser from '../stubs/user';
import { createSchemaAndSeedDB, dropTables } from '../setup';

chai.use(chaiHttp);

describe('UserControler', () => {

    beforeAll(async () => {
        await createSchemaAndSeedDB();
    });

    afterAll(async () => {
        await dropTables();
    });

    test('should return a not-empty list of users', (done) => {
        chai.request(app)
            .get('/users')
            .set('x-access-token', process.env.TOKEN)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.lengthOf.above(0);
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should return a specific user', (done) => {
        chai.request(app)
            .get('/users/1')
            .set('x-access-token', process.env.TOKEN)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.all.keys('age', 'id', 'isDeleted', 'login', 'password');
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should create a user', (done) => {
        chai.request(app)
            .post('/users')
            .set('x-access-token', process.env.TOKEN)
            .send(testUser)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(testUser);
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should update a user', (done) => {
        const fieldsToUpdate = { age: 20, login: 'test-user', password: 'password' };
        chai.request(app)
            .put('/users/1')
            .set('x-access-token', process.env.TOKEN)
            .send(fieldsToUpdate)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql([1]);
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should soft delete a user', async (done) => {
        await chai.request(app)
            .delete('/users/4')
            .set('x-access-token', process.env.TOKEN)
            .send({ isDeleted: true })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });

        chai.request(app)
            .get('/users/4')
            .set('x-access-token', process.env.TOKEN)
            .then((response) => {
                expect(response.body).to.have.property('isDeleted', true);
                done();
            }).catch(err => {
                done(err);
                throw new Error(err)
            });
    });
});