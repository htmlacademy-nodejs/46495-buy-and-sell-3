'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HTTP_CODES} = require(`../../../constants`);

const category = require(`./category`);
const DataService = require(`../../data-service/services/category`);

// Разное
// Книги
// Игры
// Посуда
// Животные

const mockData = [
  {
    "id": `k96OtyVnOKRs7UCtq3ayy`,
    "type": `offer`,
    "title": `Отдам в хорошие руки подшивку «Мурзилка».`,
    "description": `Продаю с болью в сердце... Если найдёте дешевле — сброшу цену. Таких предложений больше нет!`,
    "sum": 74489,
    "picture": `item01.jpg`,
    "category": [
      `Разное`,
      `Книги`
    ],
    "comments": [
      {
        "id": `pUHIilE6NJAlelfGHuX9w`,
        "text": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `nZx_ojfxqFEAv2Mm1uHyU`,
        "text": `А сколько игр в комплекте? Совсем немного... Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `nHTyXWQqS2awGTUK4L_po`,
    "type": `offer`,
    "title": `Продам коллекцию журналов «Огонёк».`,
    "description": `Товар в отличном состоянии. Кажется, что это хрупкая вещь. Мой дед не мог её сломать.`,
    "sum": 99533,
    "picture": `item01.jpg`,
    "category": [
      `Игры`
    ],
    "comments": [
      {
        "id": `PdXeQBqheAQ7NVTrra5GS`,
        "text": `Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "id": `HlueiD1526OrtrJv60w4_`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `3Z3MGofPJOYMncdAfvUCO`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `rVWcCRIdnRtgOu3GM7T0Y`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Если найдёте дешевле — сброшу цену. Товар в отличном состоянии. Мой дед не мог её сломать. Если товар не понравится — верну всё до последней копейки.`,
    "sum": 67321,
    "picture": `item01.jpg`,
    "category": [
      `Книги`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `KT-CQGAEa_ZIKndrjoQSS`,
        "text": `Почему в таком ужасном состоянии? Неплохо, но дорого А сколько игр в комплекте?`
      },
      {
        "id": `b4DZSQhtFzsHjCOMdKC8t`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `D80FPg13IPf-bko-n7R_g`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Если товар не понравится — верну всё до последней копейки. Кажется, что это хрупкая вещь. Пользовались бережно и только по большим праздникам.`,
    "sum": 59599,
    "picture": `item01.jpg`,
    "category": [
      `Посуда`,
      `Животные`
    ],
    "comments": [
      {
        "id": `wQNbfFzAvq64UdWdDiRzn`,
        "text": `Вы что?! В магазине дешевле. Неплохо, но дорого Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `ii5dQTRpm7kHcyavxcUo9`,
    "type": `offer`,
    "title": `Продам отличную подборку фильмов на VHS.`,
    "description": `Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам.`,
    "sum": 89089,
    "picture": `item01.jpg`,
    "category": [
      `Книги`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `9BtsV0mW-zpMPwpMMeZdC`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `esGjDFa7MxdO0g-D3_mPm`,
        "text": `Почему в таком ужасном состоянии? А сколько игр в комплекте?`
      },
      {
        "id": `4Z7aSbTDkk4nxNX5FbLTV`,
        "text": `Совсем немного... Почему в таком ужасном состоянии?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Returns list of 5 categories`, () => expect(response.body.length).toBe(5));
  test(`Category names are "Разное", "Книги", "Игры", "Посуда", "Животные"`, () => expect(response.body).toEqual(
      expect.arrayContaining([`Разное`, `Книги`, `Игры`, `Посуда`, `Животные`])
  ));

});
