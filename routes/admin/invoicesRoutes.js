/**
 * invoicesRoutes.js
 * @description :: CRUD API routes for invoices
 */

const express = require('express');
const router = express.Router();
const invoicesController = require('../../controller/admin/invoicesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/invoices/create').post(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.addInvoices);
router.route('/admin/invoices/list').post(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.findAllInvoices);
router.route('/admin/invoices/count').post(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.getInvoicesCount);
router.route('/admin/invoices/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.getInvoices);
router.route('/admin/invoices/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.updateInvoices);    
router.route('/admin/invoices/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.partialUpdateInvoices);
router.route('/admin/invoices/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.softDeleteInvoices);
router.route('/admin/invoices/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.softDeleteManyInvoices);
router.route('/admin/invoices/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.bulkInsertInvoices);
router.route('/admin/invoices/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.bulkUpdateInvoices);
router.route('/admin/invoices/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.deleteInvoices);
router.route('/admin/invoices/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,invoicesController.deleteManyInvoices);

module.exports = router;
