require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongooose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongooose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongooose.connection.close();
  });

  it('creates a new meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ bottomtext: 'that can only mean one thing', 
        toptext: 'ha long bay/hotline bling', 
        image: 'https://cdn.kapwing.com/final_5bf89f4d3a4f090013ac5fcf.jpg' })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          bottomtext: 'that can only mean one thing',
          toptext: 'ha long bay/hotline bling', 
          image: 'https://cdn.kapwing.com/final_5bf89f4d3a4f090013ac5fcf.jpg', 
          __v: 0
        });
      });
  });
  it('gets a list of memes', async() => {
    const meme = await Meme.create({ bottomtext: 'that can only mean one thing' });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });
});
