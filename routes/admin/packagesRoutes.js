/**
 * packagesRoutes.js
 * @description :: CRUD API routes for packages
 */

const express = require('express');
const router = express.Router();
const packagesController = require('../../controller/admin/packagesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/packages/create').post(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.addPackages);
router.route('/admin/packages/list').post(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.findAllPackages);
router.route('/admin/packages/count').post(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.getPackagesCount);
router.route('/admin/packages/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.getPackages);
router.route('/admin/packages/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.updatePackages);    
router.route('/admin/packages/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.partialUpdatePackages);
router.route('/admin/packages/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.softDeletePackages);
router.route('/admin/packages/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.softDeleteManyPackages);
router.route('/admin/packages/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.bulkInsertPackages);
router.route('/admin/packages/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.bulkUpdatePackages);
router.route('/admin/packages/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.deletePackages);
router.route('/admin/packages/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,packagesController.deleteManyPackages);

module.exports = router;
