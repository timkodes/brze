import elmStaticHtml from "elm-static-html-lib";
import express from 'express';
require('./Main');

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const bodyParser = require('body-parser');
console.log(process.env.RAZZLE_ASSETS_MANIFEST);

const model = { signUp: { 
    name : ""
  , phoneNumber : ""
  , number : ""
  , address1 : ""
  , address2 : ""
  , email : ""
  , creditCard : ""
  }};
const options = { model : model, decoder: "App.decodeModel" };

const server = express();
server
.disable('x-powered-by')
.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.post('/api/signup', (req, res) => {
  console.log("handle shit here");
})
.get('/*', (req, res) => {
  elmStaticHtml(process.cwd(), "App.view", options)
  .then((generatedHtml) => {
    const markup = generatedHtml;
    res.send(
      `<!doctype html>
      <html lang="">
        <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="./reset.css">
            <link rel="stylesheet" href="./fonts/fonts.css">
            ${assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''}          
            
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
        ${process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}"></script>`
        : `<script src="${assets.client.js}"></script>`}
      </html>`
    );
  }).catch((error) => {
    console.log(error);
    res.status(500).send(`<h1>An error ocurred on server, please try later, or contact support</h1>`);
  });
});

export default server;