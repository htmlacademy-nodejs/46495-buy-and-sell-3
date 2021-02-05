'use strict';

const express = require(`express`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const {HTTP_EXPRESS_PORT} = require(`../constants`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(HTTP_EXPRESS_PORT);
