const express = require('express');
const authenticateJWT=require('../middleware/authenticateToken')
const roleController = require('../controllers/roleController');
const router = express.Router();

router.get('/',authenticateJWT, roleController.getAllRole);
router.post('/', authenticateJWT,roleController.createRole);
router.get('/:id',authenticateJWT, roleController.getRoleById);
router.put('/:id',authenticateJWT,roleController.updateRole);
module.exports = router;
