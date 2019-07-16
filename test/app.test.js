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
        expect(res.body).toEqual({
          _id: expect.any(String),
          toptext: 'ha long bay/hotline bling', 
          bottomtext: 'that can only mean one thing',
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

  it('get a meme by id', async() => {
    const meme = await Meme.create({ bottomtext: 'that can only mean one thing' });
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bottomtext: 'that can only mean one thing',
          __v: 0
        });
      });   
  });

  it('can update the meme', async() => {
    const meme = await Meme.create({ toptext: 'that can only mean one thing', bottomtext: 'that can only mean one thing' });

    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ 
        toptext: 'that can only mean one thing',
        bottomtext: 'ha long bay/hotline bling', 
      })
      .then(res => {
        expect(res.body.toptext).toEqual('that can only mean one thing');
        expect(res.body.bottomtext).toEqual('ha long bay/hotline bling');
      });
  });

  it('can delete a meme by Id', async() => {
    const meme = await Meme.create({ 
      toptext: 'ha long bay/hotline bling', 
      bottomtext: 'that can only mean one thing',
      image: 'https://cdn.kapwing.com/final_5bf89f4d3a4f090013ac5fcf.jpg', 
      __v: 0
    });

    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          toptext: 'ha long bay/hotline bling', 
          bottomtext: 'that can only mean one thing',
          image: 'https://cdn.kapwing.com/final_5bf89f4d3a4f090013ac5fcf.jpg', 
          __v: 0
        });
      });
  });        
});
