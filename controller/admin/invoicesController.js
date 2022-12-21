/**
 * invoicesController.js
 * @description :: exports action methods for invoices.
 */

const Invoices = require('../../model/invoices');
const invoicesSchemaKey = require('../../utils/validation/invoicesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Invoices in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Invoices. {status, message, data}
 */ 
const addInvoices = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      invoicesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdInvoices = await dbService.createOne(Invoices,dataToCreate);
    return  res.success({ data :createdInvoices });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Invoices in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Invoicess. {status, message, data}
 */
const bulkInsertInvoices = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdInvoices = await dbService.createMany(Invoices,dataToCreate); 
      return  res.success({ data :{ count :createdInvoices.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Invoices from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Invoices(s). {status, message, data}
 */
const findAllInvoices = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundInvoices;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      invoicesSchemaKey.findFilterKeys,
      Invoices.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundInvoices = await dbService.count(Invoices, query);
      if (!foundInvoices) {
        return res.recordNotFound();
      } 
      foundInvoices = { totalRecords: foundInvoices };
      return res.success({ data :foundInvoices });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundInvoices = await dbService.paginate( Invoices,query,options);
    if (!foundInvoices){
      return res.recordNotFound();
    }
    return res.success({ data:foundInvoices }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Invoices from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Invoices. {status, message, data}
 */
const getInvoices = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundInvoices = await dbService.findOne(Invoices,{ id :id });
    if (!foundInvoices){
      return res.recordNotFound();
    }
    return  res.success({ data :foundInvoices });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Invoices.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getInvoicesCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      invoicesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedInvoices = await dbService.count(Invoices,where);
    if (!countedInvoices){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedInvoices } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Invoices with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Invoices.
 * @return {Object} : updated Invoices. {status, message, data}
 */
const updateInvoices = async (req, res) => {
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
      invoicesSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedInvoices = await dbService.update(Invoices,query,dataToUpdate);
    return  res.success({ data :updatedInvoices }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Invoices with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Invoicess.
 * @return {Object} : updated Invoicess. {status, message, data}
 */
const bulkUpdateInvoices = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedInvoices = await dbService.update(Invoices,filter,dataToUpdate);
    if (!updatedInvoices){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedInvoices.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Invoices with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Invoices.
 * @return {Object} : updated Invoices. {status, message, data}
 */
const partialUpdateInvoices = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      invoicesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedInvoices = await dbService.update(Invoices, query, dataToUpdate);
    if (!updatedInvoices) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedInvoices });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Invoices from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Invoices.
 * @return {Object} : deactivated Invoices. {status, message, data}
 */
const softDeleteInvoices = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Invoices, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Invoices from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Invoices. {status, message, data}
 */
const deleteInvoices = async (req, res) => {
  const result = await dbService.deleteByPk(Invoices, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Invoices in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyInvoices = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedInvoices = await dbService.destroy(Invoices,query);
    return res.success({ data :{ count :deletedInvoices.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Invoices from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Invoices.
 * @return {Object} : number of deactivated documents of Invoices. {status, message, data}
 */
const softDeleteManyInvoices = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedInvoices = await dbService.update(Invoices,query,updateBody, options);
    if (!updatedInvoices) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedInvoices.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addInvoices,
  bulkInsertInvoices,
  findAllInvoices,
  getInvoices,
  getInvoicesCount,
  updateInvoices,
  bulkUpdateInvoices,
  partialUpdateInvoices,
  softDeleteInvoices,
  deleteInvoices,
  deleteManyInvoices,
  softDeleteManyInvoices,
};
