const Express = require("express");
const BodyParser = require('body-parser');
const { JSDOM } = require("jsdom");
const Fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const CONSTANTS = require("./../constants");

const HEADER_FORMURLENCODED = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

function FetchObjToUrlEncodedStr(obj) {
  return Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')
}

function FetchJson() {
  return Fetch.call(null, ...arguments).then(x => x.json());
}

function FetchText() {
  return Fetch.call(null, ...arguments).then(x => x.text());
}

module.exports = exports = {
  Express,
  BodyParser,
  JSDOM,
  Fetch,
  FetchJson,
  FetchText,
  FetchObjToUrlEncodedStr,
  HEADER_FORMURLENCODED,
  CONSTANTS,
};
