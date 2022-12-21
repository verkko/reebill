/**
 * customersController.js
 * @description :: exports action methods for customers.
 */

const Customers = require('../../../model/customers');
const customersSchemaKey = require('../../../utils/validation/customersValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Customers in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Customers. {status, message, data}
 */ 
const addCustomers = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      customersSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCustomers = await dbService.createOne(Customers,dataToCreate);
    return  res.success({ data :createdCustomers });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Customers in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Customerss. {status, message, data}
 */
const bulkInsertCustomers = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCustomers = await dbService.createMany(Customers,dataToCreate); 
      return  res.success({ data :{ count :createdCustomers.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Customers from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Customers(s). {status, message, data}
 */
const findAllCustomers = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCustomers;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      customersSchemaKey.findFilterKeys,
      Customers.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCustomers = await dbService.count(Customers, query);
      if (!foundCustomers) {
        return res.recordNotFound();
      } 
      foundCustomers = { totalRecords: foundCustomers };
      return res.success({ data :foundCustomers });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCustomers = await dbService.paginate( Customers,query,options);
    if (!foundCustomers){
      return res.recordNotFound();
    }
    return res.success({ data:foundCustomers }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Customers from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Customers. {status, message, data}
 */
const getCustomers = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCustomers = await dbService.findOne(Customers,{ id :id });
    if (!foundCustomers){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCustomers });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Customers.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCustomersCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      customersSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCustomers = await dbService.count(Customers,where);
    if (!countedCustomers){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCustomers } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Customers with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customers.
 * @return {Object} : updated Customers. {status, message, data}
 */
const updateCustomers = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      customersSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCustomers = await dbService.update(Customers,query,dataToUpdate);
    return  res.success({ data :updatedCustomers }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Customers with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customerss.
 * @return {Object} : updated Customerss. {status, message, data}
 */
const bulkUpdateCustomers = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCustomers = await dbService.update(Customers,filter,dataToUpdate);
    if (!updatedCustomers){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCustomers.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Customers with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Customers.
 * @return {Object} : updated Customers. {status, message, data}
 */
const partialUpdateCustomers = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      customersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCustomers = await dbService.update(Customers, query, dataToUpdate);
    if (!updatedCustomers) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCustomers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Customers from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Customers.
 * @return {Object} : deactivated Customers. {status, message, data}
 */
const softDeleteCustomers = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCustomers = await deleteDependentService.softDeleteCustomers(query, updateBody);
    if (!updatedCustomers){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCustomers });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Customers from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Customers. {status, message, data}
 */
const deleteCustomers = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedCustomers = await deleteDependentService.countCustomers(query);
      if (!countedCustomers){
        return res.recordNotFound();
      }
      return res.success({ data :countedCustomers });
    }
    let deletedCustomers = await deleteDependentService.deleteUser(query);
    if (!deletedCustomers){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedCustomers });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Customers in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCustomers = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedCustomers = await deleteDependentService.countCustomers(query);
      if (!countedCustomers) {
        return res.recordNotFound();
      }
      return res.success({ data: countedCustomers });            
    }
    let deletedCustomers = await deleteDependentService.deleteCustomers(query);
    if (!deletedCustomers) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedCustomers });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Customers from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Customers.
 * @return {Object} : number of deactivated documents of Customers. {status, message, data}
 */
const softDeleteManyCustomers = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCustomers = await deleteDependentService.softDeleteCustomers(query, updateBody);
    if (!updatedCustomers) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCustomers });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCustomers,
  bulkInsertCustomers,
  findAllCustomers,
  getCustomers,
  getCustomersCount,
  updateCustomers,
  bulkUpdateCustomers,
  partialUpdateCustomers,
  softDeleteCustomers,
  deleteCustomers,
  deleteManyCustomers,
  softDeleteManyCustomers,
};
