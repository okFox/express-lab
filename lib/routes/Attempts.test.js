const mongoose = require('mongoose');
const Attempt = require('../routes/attempts');


//TESTING ROUTES
describe('Attempt Model', () => {
  it('has a required recipe ID', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.recipeId.message).toEqual('Path `recipeId` is required.');
  });

  it('has a required attempt date', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();
  });

});