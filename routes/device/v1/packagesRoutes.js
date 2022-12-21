/**
 * packagesRoutes.js
 * @description :: CRUD API routes for packages
 */

const express = require('express');
const router = express.Router();
const packagesController = require('../../../controller/device/v1/packagesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/packages/create').post(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.addPackages);
router.route('/device/api/v1/packages/list').post(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.findAllPackages);
router.route('/device/api/v1/packages/count').post(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.getPackagesCount);
router.route('/device/api/v1/packages/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.getPackages);
router.route('/device/api/v1/packages/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.updatePackages);    
router.route('/device/api/v1/packages/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.partialUpdatePackages);
router.route('/device/api/v1/packages/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.softDeletePackages);
router.route('/device/api/v1/packages/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.softDeleteManyPackages);
router.route('/device/api/v1/packages/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.bulkInsertPackages);
router.route('/device/api/v1/packages/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.bulkUpdatePackages);
router.route('/device/api/v1/packages/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.deletePackages);
router.route('/device/api/v1/packages/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,packagesController.deleteManyPackages);

module.exports = router;
