/**
 * areasRoutes.js
 * @description :: CRUD API routes for areas
 */

const express = require('express');
const router = express.Router();
const areasController = require('../../controller/admin/areasController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/areas/create').post(auth(PLATFORM.ADMIN),checkRolePermission,areasController.addAreas);
router.route('/admin/areas/list').post(auth(PLATFORM.ADMIN),checkRolePermission,areasController.findAllAreas);
router.route('/admin/areas/count').post(auth(PLATFORM.ADMIN),checkRolePermission,areasController.getAreasCount);
router.route('/admin/areas/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,areasController.getAreas);
router.route('/admin/areas/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,areasController.updateAreas);    
router.route('/admin/areas/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,areasController.partialUpdateAreas);
router.route('/admin/areas/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,areasController.softDeleteAreas);
router.route('/admin/areas/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,areasController.softDeleteManyAreas);
router.route('/admin/areas/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,areasController.bulkInsertAreas);
router.route('/admin/areas/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,areasController.bulkUpdateAreas);
router.route('/admin/areas/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,areasController.deleteAreas);
router.route('/admin/areas/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,areasController.deleteManyAreas);

module.exports = router;
