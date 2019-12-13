require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Attempt = require('../models/Attempts');

describe('attempt routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let recipe;
  let attempt;
  beforeEach(async() => {
    recipe = await Recipe.create({
      name: 'cookies',
      ingredients: [
        { name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    });

    attempt = await Attempt.create({
      recipeId: recipe._id,
      dateOfAttempt: new Date(),
      notes: 'It was good',
      rating: 5
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        recipeId: recipe._id,
        dateOfAttempt: Date.now(),
        notes: 'It went well',
        rating: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfAttempt: expect.any(String),
          notes: 'It went well',
          rating: 4,
          __v: 0
        });
      });
  });

  it('gets all attempts', async() => {
    const attempts = await Attempt.create([
      { recipeId: recipe._id, dateOfAttempt: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfAttempt: Date.now(), rating: 2 },
      { recipeId: recipe._id, dateOfAttempt: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfAttempt: Date.now(), rating: 5 },
    ]);

    return request(app)
      .get('/api/v1/attempts')
      .then(res => {
        attempts.forEach(attempt => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(attempt)));
        });
      });
  });

  it('gets an attempt by id', async() => {
    return request(app)
      .get(`/api/v1/attempts/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: JSON.parse(JSON.stringify(recipe)),
          dateOfAttempt: expect.any(String),
          notes: 'It was good',
          rating: 5,
          __v: 0
        });
      });
  });

  it('updates an attempt by id', async() => {
    return request(app)
      .patch(`/api/v1/events/${attempt._id}`)
      .send({ rating: 4 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfAttempt: expect.any(String),
          notes: 'It was good',
          rating: 4,
          __v: 0
        });
      });
  });

  it('deletes an attempt by id', async() => {
    return request(app)
      .delete(`/api/v1/attempt/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: recipe._id.toString(),
          dateOfAttempt: expect.any(String),
          notes: 'It was good',
          rating: 5,
          __v: 0
        });
      });
  });
});
