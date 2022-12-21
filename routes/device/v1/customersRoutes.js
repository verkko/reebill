/**
 * customersRoutes.js
 * @description :: CRUD API routes for customers
 */

const express = require('express');
const router = express.Router();
const customersController = require('../../../controller/device/v1/customersController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/customers/create').post(auth(PLATFORM.DEVICE),checkRolePermission,customersController.addCustomers);
router.route('/device/api/v1/customers/list').post(auth(PLATFORM.DEVICE),checkRolePermission,customersController.findAllCustomers);
router.route('/device/api/v1/customers/count').post(auth(PLATFORM.DEVICE),checkRolePermission,customersController.getCustomersCount);
router.route('/device/api/v1/customers/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,customersController.getCustomers);
router.route('/device/api/v1/customers/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customersController.updateCustomers);    
router.route('/device/api/v1/customers/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customersController.partialUpdateCustomers);
router.route('/device/api/v1/customers/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,customersController.softDeleteCustomers);
router.route('/device/api/v1/customers/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,customersController.softDeleteManyCustomers);
router.route('/device/api/v1/customers/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,customersController.bulkInsertCustomers);
router.route('/device/api/v1/customers/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,customersController.bulkUpdateCustomers);
router.route('/device/api/v1/customers/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,customersController.deleteCustomers);
router.route('/device/api/v1/customers/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,customersController.deleteManyCustomers);

module.exports = router;
