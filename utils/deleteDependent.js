/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Invoices = require('../model/invoices');
let Packages = require('../model/packages');
let Msos = require('../model/msos');
let Stbs = require('../model/stbs');
let Customers = require('../model/customers');
let Areas = require('../model/areas');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteInvoices = async (filter) =>{
  try {
    let response  = await dbService.destroy(Invoices,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePackages = async (filter) =>{
  try {
    let packages = await dbService.findAll(Packages,filter);
    if (packages && packages.length){
      packages = packages.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ package : { $in : packages } }] };
      const invoicesCnt = await dbService.destroy(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ package : { $in : packages } }] };
      const stbsCnt = await dbService.destroy(Stbs,stbsFilter);

      let deleted  = await dbService.destroy(Packages,filter);
      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response; 
    } else {
      return {  packages : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMsos = async (filter) =>{
  try {
    let msos = await dbService.findAll(Msos,filter);
    if (msos && msos.length){
      msos = msos.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ mso : { $in : msos } }] };
      const invoicesCnt = await dbService.destroy(Invoices,invoicesFilter);

      const packagesFilter = { $or: [{ mso : { $in : msos } }] };
      const packagesCnt = await dbService.destroy(Packages,packagesFilter);

      const stbsFilter = { $or: [{ mso : { $in : msos } }] };
      const stbsCnt = await dbService.destroy(Stbs,stbsFilter);

      let deleted  = await dbService.destroy(Msos,filter);
      let response = {
        invoices :invoicesCnt.length,
        packages :packagesCnt.length,
        stbs :stbsCnt.length,
      };
      return response; 
    } else {
      return {  msos : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteStbs = async (filter) =>{
  try {
    let response  = await dbService.destroy(Stbs,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustomers = async (filter) =>{
  try {
    let customers = await dbService.findAll(Customers,filter);
    if (customers && customers.length){
      customers = customers.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ customer : { $in : customers } }] };
      const invoicesCnt = await dbService.destroy(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ customerID : { $in : customers } }] };
      const stbsCnt = await dbService.destroy(Stbs,stbsFilter);

      let deleted  = await dbService.destroy(Customers,filter);
      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response; 
    } else {
      return {  customers : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAreas = async (filter) =>{
  try {
    let areas = await dbService.findAll(Areas,filter);
    if (areas && areas.length){
      areas = areas.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ area : { $in : areas } }] };
      const invoicesCnt = await dbService.destroy(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ area : { $in : areas } }] };
      const stbsCnt = await dbService.destroy(Stbs,stbsFilter);

      let deleted  = await dbService.destroy(Areas,filter);
      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response; 
    } else {
      return {  areas : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ distributor : { $in : user } },{ operator : { $in : user } }] };
      const invoicesCnt = await dbService.destroy(Invoices,invoicesFilter);

      const packagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ userID : { $in : user } }] };
      const packagesCnt = await dbService.destroy(Packages,packagesFilter);

      const msosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const msosCnt = await dbService.destroy(Msos,msosFilter);

      const stbsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stbsCnt = await dbService.destroy(Stbs,stbsFilter);

      const customersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ operator : { $in : user } },{ distributer : { $in : user } }] };
      const customersCnt = await dbService.destroy(Customers,customersFilter);

      const areasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ userID : { $in : user } }] };
      const areasCnt = await dbService.destroy(Areas,areasFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        invoices :invoicesCnt.length,
        packages :packagesCnt.length,
        msos :msosCnt.length,
        stbs :stbsCnt.length,
        customers :customersCnt.length,
        areas :areasCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countInvoices = async (filter) =>{
  try {
    const invoicesCnt =  await dbService.count(Invoices,filter);
    return { invoices : invoicesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPackages = async (filter) =>{
  try {
    let packages = await dbService.findAll(Packages,filter);
    if (packages && packages.length){
      packages = packages.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ package : { $in : packages } }] };
      const invoicesCnt =  await dbService.count(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ package : { $in : packages } }] };
      const stbsCnt =  await dbService.count(Stbs,stbsFilter);

      let response = {
        invoices : invoicesCnt,
        stbs : stbsCnt,
      };
      return response; 
    } else {
      return {  packages : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMsos = async (filter) =>{
  try {
    let msos = await dbService.findAll(Msos,filter);
    if (msos && msos.length){
      msos = msos.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ mso : { $in : msos } }] };
      const invoicesCnt =  await dbService.count(Invoices,invoicesFilter);

      const packagesFilter = { $or: [{ mso : { $in : msos } }] };
      const packagesCnt =  await dbService.count(Packages,packagesFilter);

      const stbsFilter = { $or: [{ mso : { $in : msos } }] };
      const stbsCnt =  await dbService.count(Stbs,stbsFilter);

      let response = {
        invoices : invoicesCnt,
        packages : packagesCnt,
        stbs : stbsCnt,
      };
      return response; 
    } else {
      return {  msos : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countStbs = async (filter) =>{
  try {
    const stbsCnt =  await dbService.count(Stbs,filter);
    return { stbs : stbsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustomers = async (filter) =>{
  try {
    let customers = await dbService.findAll(Customers,filter);
    if (customers && customers.length){
      customers = customers.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ customer : { $in : customers } }] };
      const invoicesCnt =  await dbService.count(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ customerID : { $in : customers } }] };
      const stbsCnt =  await dbService.count(Stbs,stbsFilter);

      let response = {
        invoices : invoicesCnt,
        stbs : stbsCnt,
      };
      return response; 
    } else {
      return {  customers : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAreas = async (filter) =>{
  try {
    let areas = await dbService.findAll(Areas,filter);
    if (areas && areas.length){
      areas = areas.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ area : { $in : areas } }] };
      const invoicesCnt =  await dbService.count(Invoices,invoicesFilter);

      const stbsFilter = { $or: [{ area : { $in : areas } }] };
      const stbsCnt =  await dbService.count(Stbs,stbsFilter);

      let response = {
        invoices : invoicesCnt,
        stbs : stbsCnt,
      };
      return response; 
    } else {
      return {  areas : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const invoicesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ distributor : { $in : user } },{ operator : { $in : user } }] };
      const invoicesCnt =  await dbService.count(Invoices,invoicesFilter);

      const packagesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ userID : { $in : user } }] };
      const packagesCnt =  await dbService.count(Packages,packagesFilter);

      const msosFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const msosCnt =  await dbService.count(Msos,msosFilter);

      const stbsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stbsCnt =  await dbService.count(Stbs,stbsFilter);

      const customersFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ operator : { $in : user } },{ distributer : { $in : user } }] };
      const customersCnt =  await dbService.count(Customers,customersFilter);

      const areasFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ userID : { $in : user } }] };
      const areasCnt =  await dbService.count(Areas,areasFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        invoices : invoicesCnt,
        packages : packagesCnt,
        msos : msosCnt,
        stbs : stbsCnt,
        customers : customersCnt,
        areas : areasCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteInvoices = async (filter,updateBody) =>{  
  try {
    const invoicesCnt =  await dbService.update(Invoices,filter);
    return { invoices : invoicesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePackages = async (filter,updateBody) =>{  
  try {
    let packages = await dbService.findAll(Packages,filter, { id:1 });
    if (packages.length){
      packages = packages.map((obj) => obj.id);

      const invoicesFilter = { '$or': [{ package : { '$in' : packages } }] };
      const invoicesCnt = await dbService.update(Invoices,invoicesFilter,updateBody);

      const stbsFilter = { '$or': [{ package : { '$in' : packages } }] };
      const stbsCnt = await dbService.update(Stbs,stbsFilter,updateBody);
      let updated = await dbService.update(Packages,filter,updateBody);

      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response;
    } else {
      return {  packages : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMsos = async (filter,updateBody) =>{  
  try {
    let msos = await dbService.findAll(Msos,filter, { id:1 });
    if (msos.length){
      msos = msos.map((obj) => obj.id);

      const invoicesFilter = { '$or': [{ mso : { '$in' : msos } }] };
      const invoicesCnt = await dbService.update(Invoices,invoicesFilter,updateBody);

      const packagesFilter = { '$or': [{ mso : { '$in' : msos } }] };
      const packagesCnt = await dbService.update(Packages,packagesFilter,updateBody);

      const stbsFilter = { '$or': [{ mso : { '$in' : msos } }] };
      const stbsCnt = await dbService.update(Stbs,stbsFilter,updateBody);
      let updated = await dbService.update(Msos,filter,updateBody);

      let response = {
        invoices :invoicesCnt.length,
        packages :packagesCnt.length,
        stbs :stbsCnt.length,
      };
      return response;
    } else {
      return {  msos : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteStbs = async (filter,updateBody) =>{  
  try {
    const stbsCnt =  await dbService.update(Stbs,filter);
    return { stbs : stbsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustomers = async (filter,updateBody) =>{  
  try {
    let customers = await dbService.findAll(Customers,filter, { id:1 });
    if (customers.length){
      customers = customers.map((obj) => obj.id);

      const invoicesFilter = { '$or': [{ customer : { '$in' : customers } }] };
      const invoicesCnt = await dbService.update(Invoices,invoicesFilter,updateBody);

      const stbsFilter = { '$or': [{ customerID : { '$in' : customers } }] };
      const stbsCnt = await dbService.update(Stbs,stbsFilter,updateBody);
      let updated = await dbService.update(Customers,filter,updateBody);

      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response;
    } else {
      return {  customers : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAreas = async (filter,updateBody) =>{  
  try {
    let areas = await dbService.findAll(Areas,filter, { id:1 });
    if (areas.length){
      areas = areas.map((obj) => obj.id);

      const invoicesFilter = { '$or': [{ area : { '$in' : areas } }] };
      const invoicesCnt = await dbService.update(Invoices,invoicesFilter,updateBody);

      const stbsFilter = { '$or': [{ area : { '$in' : areas } }] };
      const stbsCnt = await dbService.update(Stbs,stbsFilter,updateBody);
      let updated = await dbService.update(Areas,filter,updateBody);

      let response = {
        invoices :invoicesCnt.length,
        stbs :stbsCnt.length,
      };
      return response;
    } else {
      return {  areas : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const invoicesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ distributor : { '$in' : user } },{ operator : { '$in' : user } }] };
      const invoicesCnt = await dbService.update(Invoices,invoicesFilter,updateBody);

      const packagesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ userID : { '$in' : user } }] };
      const packagesCnt = await dbService.update(Packages,packagesFilter,updateBody);

      const msosFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const msosCnt = await dbService.update(Msos,msosFilter,updateBody);

      const stbsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const stbsCnt = await dbService.update(Stbs,stbsFilter,updateBody);

      const customersFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ operator : { '$in' : user } },{ distributer : { '$in' : user } }] };
      const customersCnt = await dbService.update(Customers,customersFilter,updateBody);

      const areasFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ userID : { '$in' : user } }] };
      const areasCnt = await dbService.update(Areas,areasFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        invoices :invoicesCnt.length,
        packages :packagesCnt.length,
        msos :msosCnt.length,
        stbs :stbsCnt.length,
        customers :customersCnt.length,
        areas :areasCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteInvoices,
  deletePackages,
  deleteMsos,
  deleteStbs,
  deleteCustomers,
  deleteAreas,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countInvoices,
  countPackages,
  countMsos,
  countStbs,
  countCustomers,
  countAreas,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteInvoices,
  softDeletePackages,
  softDeleteMsos,
  softDeleteStbs,
  softDeleteCustomers,
  softDeleteAreas,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
