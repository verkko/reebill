/**
 * msosRoutes.js
 * @description :: CRUD API routes for msos
 */

const express = require('express');
const router = express.Router();
const msosController = require('../../../controller/device/v1/msosController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/msos/create').post(auth(PLATFORM.DEVICE),checkRolePermission,msosController.addMsos);
router.route('/device/api/v1/msos/list').post(auth(PLATFORM.DEVICE),checkRolePermission,msosController.findAllMsos);
router.route('/device/api/v1/msos/count').post(auth(PLATFORM.DEVICE),checkRolePermission,msosController.getMsosCount);
router.route('/device/api/v1/msos/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,msosController.getMsos);
router.route('/device/api/v1/msos/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,msosController.updateMsos);    
router.route('/device/api/v1/msos/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,msosController.partialUpdateMsos);
router.route('/device/api/v1/msos/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,msosController.softDeleteMsos);
router.route('/device/api/v1/msos/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,msosController.softDeleteManyMsos);
router.route('/device/api/v1/msos/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,msosController.bulkInsertMsos);
router.route('/device/api/v1/msos/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,msosController.bulkUpdateMsos);
router.route('/device/api/v1/msos/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,msosController.deleteMsos);
router.route('/device/api/v1/msos/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,msosController.deleteManyMsos);

module.exports = router;
