/**
 * stbsRoutes.js
 * @description :: CRUD API routes for stbs
 */

const express = require('express');
const router = express.Router();
const stbsController = require('../../controller/admin/stbsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/stbs/create').post(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.addStbs);
router.route('/admin/stbs/list').post(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.findAllStbs);
router.route('/admin/stbs/count').post(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.getStbsCount);
router.route('/admin/stbs/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.getStbs);
router.route('/admin/stbs/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.updateStbs);    
router.route('/admin/stbs/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.partialUpdateStbs);
router.route('/admin/stbs/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.softDeleteStbs);
router.route('/admin/stbs/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.softDeleteManyStbs);
router.route('/admin/stbs/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.bulkInsertStbs);
router.route('/admin/stbs/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.bulkUpdateStbs);
router.route('/admin/stbs/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.deleteStbs);
router.route('/admin/stbs/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,stbsController.deleteManyStbs);

module.exports = router;
