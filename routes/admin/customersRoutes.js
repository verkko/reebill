/**
 * customersRoutes.js
 * @description :: CRUD API routes for customers
 */

const express = require('express');
const router = express.Router();
const customersController = require('../../controller/admin/customersController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/customers/create').post(auth(PLATFORM.ADMIN),checkRolePermission,customersController.addCustomers);
router.route('/admin/customers/list').post(auth(PLATFORM.ADMIN),checkRolePermission,customersController.findAllCustomers);
router.route('/admin/customers/count').post(auth(PLATFORM.ADMIN),checkRolePermission,customersController.getCustomersCount);
router.route('/admin/customers/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,customersController.getCustomers);
router.route('/admin/customers/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,customersController.updateCustomers);    
router.route('/admin/customers/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,customersController.partialUpdateCustomers);
router.route('/admin/customers/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,customersController.softDeleteCustomers);
router.route('/admin/customers/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,customersController.softDeleteManyCustomers);
router.route('/admin/customers/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,customersController.bulkInsertCustomers);
router.route('/admin/customers/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,customersController.bulkUpdateCustomers);
router.route('/admin/customers/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,customersController.deleteCustomers);
router.route('/admin/customers/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,customersController.deleteManyCustomers);

module.exports = router;
