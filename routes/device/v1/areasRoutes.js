/**
 * areasRoutes.js
 * @description :: CRUD API routes for areas
 */

const express = require('express');
const router = express.Router();
const areasController = require('../../../controller/device/v1/areasController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/areas/create').post(auth(PLATFORM.DEVICE),checkRolePermission,areasController.addAreas);
router.route('/device/api/v1/areas/list').post(auth(PLATFORM.DEVICE),checkRolePermission,areasController.findAllAreas);
router.route('/device/api/v1/areas/count').post(auth(PLATFORM.DEVICE),checkRolePermission,areasController.getAreasCount);
router.route('/device/api/v1/areas/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,areasController.getAreas);
router.route('/device/api/v1/areas/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,areasController.updateAreas);    
router.route('/device/api/v1/areas/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,areasController.partialUpdateAreas);
router.route('/device/api/v1/areas/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,areasController.softDeleteAreas);
router.route('/device/api/v1/areas/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,areasController.softDeleteManyAreas);
router.route('/device/api/v1/areas/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,areasController.bulkInsertAreas);
router.route('/device/api/v1/areas/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,areasController.bulkUpdateAreas);
router.route('/device/api/v1/areas/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,areasController.deleteAreas);
router.route('/device/api/v1/areas/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,areasController.deleteManyAreas);

module.exports = router;
