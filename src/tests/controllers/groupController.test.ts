import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import testGroup from '../stubs/group';
import { createSchemaAndSeedDB, dropTables } from '../setup';

chai.use(chaiHttp);

describe('GroupController', () => {
    let token;
    beforeAll(async () => {
        await createSchemaAndSeedDB();
        return chai.request(app).post('/login').send({ username: 'oleg-pronin' })
            .then(res => { token = res.text })
            .catch(err => { throw new Error(err) });
    });
    afterAll(() => {
       return dropTables();
    });

    test('should return a not-empty list of groups', async() => {
        await chai.request(app)
            .get('/groups')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.lengthOf.above(0);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should return a specific group', async() => {
        await chai.request(app)
            .get('/groups/1')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.all.keys('id', 'name', 'permissions');
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should create a group', async () => {
        await chai.request(app)
            .post('/groups')
            .set('x-access-token', token)
            .send(testGroup)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(testGroup);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should update a group', async () => {
        const fieldsToUpdate = { name: 'superusers', permissions: ['CREATE', 'WRITE', 'DELETE'] };
        await chai.request(app)
            .put('/groups/1')
            .set('x-access-token', token)
            .send(fieldsToUpdate)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql([1]);
            }).catch((err) => {
                throw new Error(err);
            });
    });

    test('should delete a group', async () => {
        await chai.request(app)
            .delete('/groups/2')
            .set('x-access-token', token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.ok;
            }).catch((err) => {
                throw new Error(err);
            });

    });
});