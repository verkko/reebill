/**
 * invoicesRoutes.js
 * @description :: CRUD API routes for invoices
 */

const express = require('express');
const router = express.Router();
const invoicesController = require('../../../controller/device/v1/invoicesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/invoices/create').post(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.addInvoices);
router.route('/device/api/v1/invoices/list').post(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.findAllInvoices);
router.route('/device/api/v1/invoices/count').post(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.getInvoicesCount);
router.route('/device/api/v1/invoices/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.getInvoices);
router.route('/device/api/v1/invoices/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.updateInvoices);    
router.route('/device/api/v1/invoices/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.partialUpdateInvoices);
router.route('/device/api/v1/invoices/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.softDeleteInvoices);
router.route('/device/api/v1/invoices/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.softDeleteManyInvoices);
router.route('/device/api/v1/invoices/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.bulkInsertInvoices);
router.route('/device/api/v1/invoices/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.bulkUpdateInvoices);
router.route('/device/api/v1/invoices/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.deleteInvoices);
router.route('/device/api/v1/invoices/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,invoicesController.deleteManyInvoices);

module.exports = router;
