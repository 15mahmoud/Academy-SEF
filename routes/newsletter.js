const express = require("express");
const verifyTokenAndAuthorization = require("../middlewares/verifyToken")
const {
    subscribe,
    getAllSubscribers,
    exportAllSubscribersAsExcles,
    exportAllSubscribersAsPdf } = require("../controllers/newsletterController");
const router = express.Router();


router.post('/subscribe', subscribe);
router.get('/subscribers', getAllSubscribers);
router.get('/subscribers/export-as-excel', exportAllSubscribersAsExcles);
router.get('/subscribers/export-as-pdf', exportAllSubscribersAsPdf);


module.exports = router;

