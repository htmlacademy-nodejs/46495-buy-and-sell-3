'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HTTP_CODES} = require(`../../../constants`);

const offers = require(`./offers`);
const DataService = require(`../../data-service/services/offers`);

// Посуда
// Животные
// Разное
// Игры
// Книги

const mockData = [
  {
    "id": `fXmtQpI7meAbshb0oWfFD`,
    "type": `offer`,
    "title": `Куплю антиквариат.`,
    "description": `При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе. Кому нужен этот новый телефон, если тут такое... Даю недельную гарантию.`,
    "sum": 75519,
    "picture": `item01.jpg`,
    "category": [
      `Посуда`
    ],
    "comments": [
      {
        "id": `vmsFm8IyIr28r25JKtcPl`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `5SntuFY2V1pPcssl1dKYs`,
    "type": `offer`,
    "title": `Куплю антиквариат.`,
    "description": `Две страницы заляпаны свежим кофе.`,
    "sum": 84281,
    "picture": `item01.jpg`,
    "category": [
      `Животные`
    ],
    "comments": [
      {
        "id": `NRiJ-p4yr-HI3ABizJvJ5`,
        "text": `Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `ZgprvSX5JKrJQ_GBh3ovw`,
    "type": `offer`,
    "title": `Продам новую приставку Sony Playstation 5.`,
    "description": `Даю недельную гарантию. Бонусом отдам все аксессуары.`,
    "sum": 11448,
    "picture": `item01.jpg`,
    "category": [
      `Животные`,
      `Разное`
    ],
    "comments": [
      {
        "id": `3A21Y2puUborz36R7tNBC`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `XM9jHGskWTr-iYnICf7Zi`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "id": `Uy2fsdqP00nDRarv5OEVN`,
        "text": `Почему в таком ужасном состоянии? Неплохо, но дорого`
      }
    ]
  },
  {
    "id": `A3dZ22Z5MG5ZoNZPrnc39`,
    "type": `offer`,
    "title": `Продам книги Стивена Кинга.`,
    "description": `Мой дед не мог её сломать.`,
    "sum": 15032,
    "picture": `item01.jpg`,
    "category": [
      `Игры`
    ],
    "comments": [
      {
        "id": `Z2xDBCdgNCRscHfZFWOSp`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `lray8THYA1FjqxImvu1I7`,
        "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `ivZ0x7kpjY76qGakIq_6x`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Кому нужен этот новый телефон, если тут такое...`,
    "sum": 76463,
    "picture": `item01.jpg`,
    "category": [
      `Книги`,
      `Животные`
    ],
    "comments": [
      {
        "id": `8KfqeMAP06_Dw7jvDUzqZ`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      },
      {
        "id": `IlGqfTMobzafcgiOc--g0`,
        "text": `Неплохо, но дорого Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offers(app, new DataService(cloneData));
  return app;
};

describe(`API returns a list of all offers`, () => {

  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));
  test(`First offer's id equals "fXmtQpI7meAbshb0oWfFD"`, () => expect(response.body[0].id).toBe(`fXmtQpI7meAbshb0oWfFD`));

});

describe(`API returns an offer with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/offers/fXmtQpI7meAbshb0oWfFD`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Offer's title is "Куплю антиквариат."`, () => expect(response.body.title).toBe(`Куплю антиквариат.`));

});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HTTP_CODES.CREATED));
  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));
  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HTTP_CODES.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newOffer = {
    category: [`Котики`],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/fXmtQpI7meAbshb0oWfFD`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Offer is really changed`, () => request(app)
    .get(`/offers/fXmtQpI7meAbshb0oWfFD`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: [`Это`],
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HTTP_CODES.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/fXmtQpI7meAbshb0oWfFD`)
    .send(invalidOffer)
    .expect(HTTP_CODES.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/fXmtQpI7meAbshb0oWfFD`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`fXmtQpI7meAbshb0oWfFD`));

  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HTTP_CODES.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HTTP_CODES.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/fXmtQpI7meAbshb0oWfFD/comments/NOEXST`)
    .expect(HTTP_CODES.NOT_FOUND);

});
