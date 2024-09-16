const express = require("express");
const verifyTokenAndAuthorization = require("../middlewares/verifyToken")
const { addNewMessenger, getAllMessages, getArchivedMessages, addToArchive } = require("../controllers/messengerController");
const router = express.Router();


router.post('/', addNewMessenger);
router.get('/', getAllMessages);
router.get('/archived-message', getArchivedMessages);
router.put('/:id', addToArchive);


module.exports = router;
