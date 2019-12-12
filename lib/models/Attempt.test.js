const mongoose = require('mongoose');
const Attempt = require('../models/Attempts');


//TESTING MODEL
describe('Attempt model', () => {
  it('has a required recipeId', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.recipeId.message).toEqual('Path `recipeId` is required.');
  });

  it('has a required dateOfEvent', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
  });

  it('has a required rating', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });

  it('has a rating 1 or above', () => {
    const attempt = new Attempt({
      rating: -1
    });
    const { errors } = attempt.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (1).');
  });

  it('has a rating 5 or below', () => {
    const attempt = new Attempt({
      rating: 6
    });
    const { errors } = attempt.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
});
