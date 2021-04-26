'use strict';

const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../../constants`);
const {offerValidator, commentValidator, offerExists} = require(`../../middlewares`);

module.exports = (app, offerService) => {
  const route = new Router();
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    return res.status(HTTP_CODES.SUCCESS).json(offerService.getAll());
  });

  route.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    return res.status(HTTP_CODES.SUCCESS).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);
    return res.status(HTTP_CODES.CREATED).json(offer);
  });

  route.put(`/:offerId`, offerExists(offerService), offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.edit(offerId, req.body);
    return res.status(HTTP_CODES.SUCCESS).json(offer);
  });

  route.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.delete(offerId);
    return res.status(HTTP_CODES.SUCCESS).json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offerId} = req.params;
    const comments = offerService.getComments(offerId);
    return res.status(HTTP_CODES.SUCCESS).json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offerId, commentId} = req.params;
    const deletedComment = offerService.deleteComment(offerId, commentId);

    if (!deletedComment) {
      res.status(HTTP_CODES.NOT_FOUND).json({error: `comment not found...`});
    }

    return res.status(HTTP_CODES.SUCCESS).json(deletedComment);
  });

  route.post(`/:offerId/comments`, offerExists(offerService), commentValidator, (req, res) => {
    const {offerId} = req.params;
    const comment = offerService.createComment(offerId, req.body);
    return res.status(HTTP_CODES.SUCCESS).json(comment);
  });

};
