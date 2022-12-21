/**
 * msosRoutes.js
 * @description :: CRUD API routes for msos
 */

const express = require('express');
const router = express.Router();
const msosController = require('../../controller/admin/msosController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/msos/create').post(auth(PLATFORM.ADMIN),checkRolePermission,msosController.addMsos);
router.route('/admin/msos/list').post(auth(PLATFORM.ADMIN),checkRolePermission,msosController.findAllMsos);
router.route('/admin/msos/count').post(auth(PLATFORM.ADMIN),checkRolePermission,msosController.getMsosCount);
router.route('/admin/msos/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,msosController.getMsos);
router.route('/admin/msos/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,msosController.updateMsos);    
router.route('/admin/msos/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,msosController.partialUpdateMsos);
router.route('/admin/msos/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,msosController.softDeleteMsos);
router.route('/admin/msos/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,msosController.softDeleteManyMsos);
router.route('/admin/msos/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,msosController.bulkInsertMsos);
router.route('/admin/msos/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,msosController.bulkUpdateMsos);
router.route('/admin/msos/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,msosController.deleteMsos);
router.route('/admin/msos/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,msosController.deleteManyMsos);

module.exports = router;
