'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const {HTTP_PORT, HTTP_CODES} = require(`../../constants`);

const getResponseText = (list) => (`
  <!Doctype html>
    <html lang="ru">
      <head>
        <title>Hello bro!</title>
      </head>
      <body>
        <h1>Объявления:</h1>
        <ul>
          ${list}
        </ul>
      </body>
    </html>
`);

const onClientConnect = (request, response) => {
  switch (request.url) {

    case `/`:
      try {
        const data = require(`../../../mocks.json`);
        const list = data.map((item) => `<li>${item.title}</li>`);
        const responseText = getResponseText(list.join(``));

        response.writeHead(HTTP_CODES.SUCCESS, {
          'Content-Type': `text/html; charset=UTF-8`,
        });

        response.end(responseText);
      } catch (err) {
        response.writeHead(HTTP_CODES.NOT_FOUND, {
          'Content-Type': `text/plain; charset=UTF-8`,
        });
        response.end(`Mocks data not found...`);
      }
      break;

    default:
      response.writeHead(HTTP_CODES.NOT_FOUND, {
        'Content-Type': `text/plain; charset=UTF-8`,
      });
      response.end(`Page Not found...`);
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [setPort] = args;
    const port = setPort ? Number(setPort) : HTTP_PORT;
    const httpServer = http.createServer(onClientConnect);

    if (!Number.isInteger(port)) {
      console.error(chalk.red(`Порт указан не верно.`));
      return;
    }

    httpServer.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании http-сервера.)`, err));
      }

      return console.log(`${chalk.blue(`Сервер стартонул на порту:`)} ${port}`);
    });
  }
};
