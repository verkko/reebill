/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./invoicesRoutes'));
router.use(require('./packagesRoutes'));
router.use(require('./msosRoutes'));
router.use(require('./stbsRoutes'));
router.use(require('./customersRoutes'));
router.use(require('./areasRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
