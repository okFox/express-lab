require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Recipe = require('./Recipe');
const Attempt = require('../models/Attempts');

describe('attempt routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });


Recipe.create({name: 'stroganoff', ingredients: [], directions: [] });
    await Attempt.create({ recipeId: recipe._id, date: Date().now, notes: 'Holy McYum!', rating: 5 });

  };

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        recipeId: '1234',
        dateOfEvent: Date.now(),
        notes: 'It went well',
        rating: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: '1234',
          dateOfEvent: expect.any(String),
          notes: 'It went well',
          rating: 4,
          __v: 0
        });
      });
  });

  it('gets all attempts', async() => {
    const events = await Attempt.create([
      { recipeId: '1234', dateOfEvent: Date.now(), rating: 3 },
      { recipeId: '3456', dateOfEvent: Date.now(), rating: 2 },
      { recipeId: '2345', dateOfEvent: Date.now(), rating: 3 },
      { recipeId: '6544', dateOfEvent: Date.now(), rating: 5 },
    ]);

    return request(app)
      .get('/api/v1/events')
      .then(res => {
        events.forEach(event => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(event)));
        });
      });
  });

  it('gets an event by id', async() => {
    const event = await Event.create({
      recipeId: '1234',
      dateOfEvent: Date.now(),
      notes: 'It went well',
      rating: 4
    });

    return request(app)
      .get(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: '1234',
          dateOfEvent: expect.any(String),
          notes: 'It went well',
          rating: 4,
          __v: 0
        });
      });
  });

  it('updates an event by id', async() => {
    const event = await Event.create({
      recipeId: '1234',
      dateOfEvent: Date.now(),
      notes: 'It went well',
      rating: 4
    });

    return request(app)
      .patch(`/api/v1/events/${event._id}`)
      .send({ rating: 5 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: '1234',
          dateOfEvent: expect.any(String),
          notes: 'It went well',
          rating: 5,
          __v: 0
        });
      });
  });

  it('deletes an event by id', async() => {
    const event = await Event.create({
      recipeId: '1234',
      dateOfEvent: Date.now(),
      notes: 'It went well',
      rating: 4
    });

    return request(app)
      .delete(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: '1234',
          dateOfEvent: expect.any(String),
          notes: 'It went well',
          rating: 4,
          __v: 0
        });
      });
  });
});
