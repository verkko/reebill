/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./invoicesRoutes'));
router.use(require('./packagesRoutes'));
router.use(require('./msosRoutes'));
router.use(require('./stbsRoutes'));
router.use(require('./customersRoutes'));
router.use(require('./areasRoutes'));
router.use(require('./userRoutes'));

module.exports = router;
