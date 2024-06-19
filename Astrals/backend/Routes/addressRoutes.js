const express = require("express");
const router = express.Router();
const addressController = require('../Controllers/addressController')

router.get('/', addressController.getAddressList)
router.get('/:userId', addressController.getUserAddresses)
router.post('/', addressController.createAddress)
router.delete('/:addressId', addressController.deleteAddress)

module.exports = router;
