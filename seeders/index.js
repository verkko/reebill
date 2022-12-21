/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Raphael65' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'S9Yrozhvz4LTYef',
        'isDeleted':false,
        'username':'Raphael65',
        'email':'Bethany.Walker@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'S9Yrozhvz4LTYef',
        'isDeleted':false,
        'username':'Raphael65',
        'email':'Bethany.Walker@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Raphael65' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Lilla.Tromp' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'tNUZjIgI4vgno4Y',
        'isDeleted':false,
        'username':'Lilla.Tromp',
        'email':'Angeline90@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'tNUZjIgI4vgno4Y',
        'isDeleted':false,
        'username':'Lilla.Tromp',
        'email':'Angeline90@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Lilla.Tromp' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'operator', 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/areas/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/areas/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/areas/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/areas/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/areas/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/areas/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/areas/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/areas/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/areas/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/areas/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/areas/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/areas/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/areas/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/update/:id',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/areas/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/areas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/updatebulk',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/areas/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/areas/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/areas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/areas/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/admin/areas/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/areas/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/areas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/areas/deletemany',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/areas/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/areas/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/areas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customers/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/customers/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/customers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customers/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/customers/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/customers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customers/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/customers/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/customers/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/customers/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/customers/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/customers/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/customers/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/customers/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/customers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customers/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/customers/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/customers/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/customers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/customers/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/customers/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/customers/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/customers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/customers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customers/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/admin/customers/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/customers/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/customers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/customers/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/admin/customers/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/customers/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/customers/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/invoices/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/invoices/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/invoices/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/invoices/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/invoices/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/invoices/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/invoices/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/invoices/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/admin/invoices/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/invoices/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/invoices/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/invoices/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/admin/invoices/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/invoices/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/msos/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/msos/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/msos/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/msos/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/msos/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/msos/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/msos/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/msos/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/msos/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/msos/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/msos/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/msos/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/msos/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/update/:id',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/msos/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/msos/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/msos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/msos/updatebulk',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/msos/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/msos/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/msos/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/msos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/msos/delete/:id',
        role: 'operator',
        method: 'DELETE' 
      },
      {
        route: '/admin/msos/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/msos/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/msos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/msos/deletemany',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/msos/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/msos/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/msos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/packages/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/packages/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/packages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/packages/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/packages/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/packages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/packages/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/packages/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/packages/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/packages/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/packages/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/packages/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/packages/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/packages/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/packages/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/packages/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/packages/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/packages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/packages/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/packages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/packages/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/packages/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/packages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/packages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/packages/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/admin/packages/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/packages/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/packages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/packages/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/admin/packages/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/packages/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/packages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/stbs/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/stbs/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/stbs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/stbs/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/stbs/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/update/:id',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/updatebulk',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/stbs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/stbs/delete/:id',
        role: 'operator',
        method: 'DELETE' 
      },
      {
        route: '/admin/stbs/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/stbs/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/stbs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/stbs/deletemany',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/stbs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'operator',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'operator',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/list',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/areas/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/areas/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/areas/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/areas/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/areas/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/areas/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/areas/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/areas/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/areas/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/areas/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/areas/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/list',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/:id',
        role: 'operator',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customers/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/customers/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/customers/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customers/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customers/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customers/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customers/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customers/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customers/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customers/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/list',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/invoices/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'operator',
        method: 'GET'
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/invoices/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/invoices/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/invoices/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/invoices/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/invoices/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/msos/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/msos/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/msos/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/msos/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/msos/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/msos/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/msos/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/msos/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/msos/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/msos/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/msos/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/list',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/packages/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/:id',
        role: 'operator',
        method: 'GET'
      },
      {
        route: '/device/api/v1/packages/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/packages/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/packages/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/packages/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/packages/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/packages/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/packages/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/packages/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/packages/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/packages/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/stbs/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/stbs/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/stbs/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/stbs/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/stbs/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/stbs/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/stbs/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/stbs/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/stbs/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/stbs/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/stbs/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'operator',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'operator',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'operator',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'operator',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'operator',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'operator', 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Raphael65',
      'password':'S9Yrozhvz4LTYef'
    },{
      'username':'Lilla.Tromp',
      'password':'tNUZjIgI4vgno4Y'
    }];
    const defaultRole = await dbService.findOne(model.role, { code: 'SYSTEM_USER' });
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        userRolesArr.push({
          userId: user.id,
          roleId: defaultRole.id
        });
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;