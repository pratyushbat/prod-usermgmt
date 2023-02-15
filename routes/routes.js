const express = require('express');
const userCon = require('../controller/user-controller');
const router = express.Router();

router.post('/apis/users',userCon.userAll);

router.get("/apis/users/:userId", userCon.user_details);
router.post('/apis/users/insert',userCon.createUser );
router.post("/apis/users/update", userCon.user_update);
router.post("/apis/users/remove", userCon.user_delete);

module.exports = router;