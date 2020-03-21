import 'dotenv/config';
import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
// @ts-ignore
import authUser from '../../assets/auth-user.json';

chai.use(chaiHttp);

module.exports = async function getToken() {
    process.env.TOKEN = await chai.request(app).post('/login').send(authUser)
         .then(res => res.text)
         .catch(err => { throw new Error(err) });
};