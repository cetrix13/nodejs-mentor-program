import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testGroup from '../stubs/group';
import { createSchemaAndSeedDB, dropTables } from '../setup';

chai.use(chaiHttp);

let token;

describe('GroupController', () => {

    beforeAll(async () => {
        await createSchemaAndSeedDB();
        token = await chai.request(app).post('/login').send({ username: 'oleg-pronin' })
            .then(res => res.text)
            .catch(err => { throw new Error(err) });
    });

    afterAll(() => {
        dropTables();
    });

    test('should return a not-empty list of groups', (done) => {
        chai.request(app)
            .get('/groups')
            .set('x-access-token', token)
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

    test('should return a specific group', (done) => {
        chai.request(app)
            .get('/groups/1')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.all.keys('id', 'name', 'permissions');
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should create a group', (done) => {
        chai.request(app)
            .post('/groups')
            .set('x-access-token', token)
            .send(testGroup)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(testGroup);
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });
    });

    test('should update a group', (done) => {
        const fieldsToUpdate = { name: 'superusers', permissions: ['CREATE', 'WRITE', 'DELETE'] };
        chai.request(app)
            .put('/groups/1')
            .set('x-access-token', token)
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

    test('should delete a group', (done) => {
        chai.request(app)
            .delete('/groups/2')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
                done();
            }).catch((err) => {
                done(err);
                throw new Error(err);
            });

    });
});