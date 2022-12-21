/**
 * stbsRoutes.js
 * @description :: CRUD API routes for stbs
 */

const express = require('express');
const router = express.Router();
const stbsController = require('../../../controller/device/v1/stbsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/stbs/create').post(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.addStbs);
router.route('/device/api/v1/stbs/list').post(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.findAllStbs);
router.route('/device/api/v1/stbs/count').post(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.getStbsCount);
router.route('/device/api/v1/stbs/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.getStbs);
router.route('/device/api/v1/stbs/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.updateStbs);    
router.route('/device/api/v1/stbs/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.partialUpdateStbs);
router.route('/device/api/v1/stbs/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.softDeleteStbs);
router.route('/device/api/v1/stbs/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.softDeleteManyStbs);
router.route('/device/api/v1/stbs/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.bulkInsertStbs);
router.route('/device/api/v1/stbs/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.bulkUpdateStbs);
router.route('/device/api/v1/stbs/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.deleteStbs);
router.route('/device/api/v1/stbs/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,stbsController.deleteManyStbs);

module.exports = router;
