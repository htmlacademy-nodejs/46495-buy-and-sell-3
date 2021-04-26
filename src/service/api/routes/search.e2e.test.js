'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HTTP_CODES} = require(`../../../constants`);

const search = require(`./search`);
const DataService = require(`../../data-service/services/search`);

const mockData = [
  {
    "id": `Q0G6giRNlyPvcY1yxP2VY`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Даю недельную гарантию. Кажется, что это хрупкая вещь. Это настоящая находка для коллекционера!`,
    "sum": 82642,
    "picture": `item01.jpg`,
    "category": [
      `Животные`
    ],
    "comments": [
      {
        "id": `EtdGpTDFBYjJGGEM4kyA1`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "id": `BGU6KZUaaV9IHNwIHufBk`,
    "type": `offer`,
    "title": `Куплю породистого кота.`,
    "description": `Кажется, что это хрупкая вещь. Продаю с болью в сердце...`,
    "sum": 60773,
    "picture": `item01.jpg`,
    "category": [
      `Животные`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `Trw5MF34ojP37zAHkUPjn`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `McdHGybY5zkKKdDC3CJvh`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      },
      {
        "id": `-k3jlgVMrV2YX8_gl3SqK`,
        "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте? Неплохо, но дорого`
      }
    ]
  },
  {
    "id": `mGoqNnRrqpgMBLFEqH4w3`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Если товар не понравится — верну всё до последней копейки.`,
    "sum": 52165,
    "picture": `item01.jpg`,
    "category": [
      `Разное`,
      `Животные`
    ],
    "comments": [
      {
        "id": `TfuUYnjDSN5l8n6bhp9IO`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `Pvc_G1-oywi-HKE8FXQa-`,
    "type": `offer`,
    "title": `Продам коллекцию журналов «Огонёк».`,
    "description": `Две страницы заляпаны свежим кофе. При покупке с меня бесплатная доставка в черте города.`,
    "sum": 73064,
    "picture": `item01.jpg`,
    "category": [
      `Животные`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `DQLSkxVy8TRgN0n0aeVsN`,
        "text": `А сколько игр в комплекте? Неплохо, но дорого Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `GT4YZH9QL6LP3vD4_wNMq`,
    "type": `offer`,
    "title": `Продам книги Стивена Кинга.`,
    "description": `Две страницы заляпаны свежим кофе. Даю недельную гарантию. Кому нужен этот новый телефон, если тут такое... Товар в отличном состоянии.`,
    "sum": 44604,
    "picture": `item01.jpg`,
    "category": [
      `Разное`
    ],
    "comments": [
      {
        "id": `G61LqByJtxyp9BIu1-Nd_`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `DIlzjieTlzyYP8RGIh2Jo`,
        "text": `Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        "id": `9OPd6MJy6dkQkYJgY7QuR`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {

    response = await request(app)
      .get(`/search`)
      .query({
        query: `Куплю породистого кота.`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`BGU6KZUaaV9IHNwIHufBk`));

});

test(`API returns code 400 if query is empty`, () => request(app)
  .get(`/search`)
  .query({
    query: ``
  })
  .expect(HTTP_CODES.BAD_REQUEST)
);

test(`API returns code 404 if nothing is found`, () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HTTP_CODES.NOT_FOUND)
);
