const { JSDOM } = require("jsdom");
const express = require('express');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 8201;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function successResponse(res, data) {
  return res
    .status(200)
    .send({ success: true, data });
}

function failureResponse(res, error, code, data) {
  code = code || 400;
  return res
    .status(code)
    .send({ success: false, data, error });
}

function internalServerErrorResponse(res, error = 'Script error.') {
  return failureResponse(res, error, 500);
}

function badRequestResponse(res, error = 'Bad request.') {
  return failureResponse(res, error, 400);
}

async function login(domain) {
  await fetch(`${domain}/action/main.html`, {
    method: 'POST',
    redirect: 'follow',
    follow: 10,
    body: JSON.stringify({
      user: 'admin',
      pass: 'ljso8@DR',
      button: 'Login',
      who: 100
    })
  })
}

// Not tested
async function logout(domain) {
  return await fetch(`${domain}/action/loginout.html?who=1`, {
    redirect: 'follow',
    follow: 10,
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
  login();
});

app.get('/loginOlt', (req, res) => {
  login('https://88d1be57667df3837926074691d1dc4a.serveo.net');
});

// Not tested
app.get('/logoutOlt', async (req, res) => {
  const domain = req?.query?.domain;
  if (domain) {
    await logout(domain);
    successResponse(res);
  } else {
    badRequestResponse(res);
  }
});

app.get('/onuauthinfo', async (req, res) => {
  const res1 = await fetch('https://88d1be57667df3837926074691d1dc4a.serveo.net/action/onuauthinfo.html').then(r => r.text());
  console.log((new JSDOM(res1)));
  res.send(res1);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
