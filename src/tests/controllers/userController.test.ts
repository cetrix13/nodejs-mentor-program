import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testUser from '../stubs/user';
import { createSchemaAndSeedDB, dropTables } from '../setupDatabase';

chai.use(chaiHttp);

describe('UserControler', () => {
    let token;
    beforeAll(async () => {
        await createSchemaAndSeedDB();
        await chai.request(app).post('/login').send({ username: 'oleg-pronin' })
            .then(res => { token = res.text })
            .catch(err => { throw new Error(err) });
    });
    afterAll(async () => {
       await dropTables();
    });

    test('should return a not-empty list of users', () => {
        chai.request(app)
            .get('/users')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.lengthOf.above(0);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should return a specific user', () => {
        chai.request(app)
            .get('/users/1')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.all.keys('age', 'id', 'isDeleted', 'login', 'password');
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should create a user', () => {
        chai.request(app)
            .post('/users')
            .set('x-access-token', token)
            .send(testUser)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(testUser);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should update a user', () => {
        const fieldsToUpdate = { age: 20, login: 'test-user', password: 'password' };
        chai.request(app)
            .put('/users/1')
            .set('x-access-token', token)
            .send(fieldsToUpdate)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql([1]);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should soft delete a user', async () => {
        await chai.request(app)
            .delete('/users/4')
            .set('x-access-token', token)
            .send({ isDeleted: true })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
            }).catch((err) => {
                throw new Error(err);
            });

        await chai.request(app)
            .get('/users/4')
            .set('x-access-token', token)
            .then((response) => {
                expect(response.body).to.have.property('isDeleted', true);
            }).catch(err => { 
                throw new Error(err) 
            });
    });
});