const mongoose = require('mongoose');
const Attempt = require('./Attempts');

describe('Attempts model', () => {
  it('has a required name', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name, ingredients and directions fields', () => {
    const attempt = new Attempt({
      name: 'Cookies',
      ingredients: [],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });

    expect(attempt.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Cookies',
      ingredients: [],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });
});
