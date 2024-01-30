const Express = require("express");
const BodyParser = require('body-parser');
const { JSDOM } = require("jsdom");
const Fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const CONSTANTS = require("./../constants");

module.exports = exports = {
  Express,
  BodyParser,
  JSDOM,
  Fetch,
  CONSTANTS,
};
