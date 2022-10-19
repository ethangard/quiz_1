/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const faker = require('faker');
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clucks')
    .del()
    .then(() => {
      const clucks = Array.from({ length: 50 }).map(() => {
        return {
          username: faker.name.firstName(),
          image_url: faker.image.animals(200, 200, true),
          content: faker.lorem.paragraph(),
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
        };
      });
      return knex('clucks').insert(clucks);
    });
};
