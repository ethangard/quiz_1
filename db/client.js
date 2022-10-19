const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environementConfig = config[environment];
const knex = require('knex');
const connection = knex(environementConfig);

module.exports = connection;
