const express = require('express');
const ROLES_LIST = require('../../config/roles_list');
const router = express.Router();

const employessController = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employessController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employessController.createEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employessController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employessController.deleteEmployee)

router.route('/:id')
    .get(employessController.getEmployee)

module.exports = router;