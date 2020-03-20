import 'dotenv/config';
import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testGroup from '../stubs/group';
import { createSchemaAndSeedDB, dropTables } from '../setup';

chai.use(chaiHttp);

describe('GroupController', () => {

    beforeAll(async () => {
        await createSchemaAndSeedDB();
    });

    afterAll(async () => {
        await dropTables();
    });

    test('should return a not-empty list of groups', (done) => {
        chai.request(app)
            .get('/groups')
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

    test('should return a specific group', (done) => {
        chai.request(app)
            .get('/groups/1')
            .set('x-access-token', process.env.TOKEN)
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
            .set('x-access-token', process.env.TOKEN)
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

    test('should delete a group', (done) => {
        chai.request(app)
            .delete('/groups/2')
            .set('x-access-token', process.env.TOKEN)
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