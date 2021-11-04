const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

// obtenir tous les employés
router.get('/', employeeController.getEmployeeList);

// obtenir l’identité de l’employé
router.get('/:id',employeeController.getEmployeeByID);

// créer un nouvel employé
router.post('/', employeeController.createNewEmployee);

// mettre à jour l’employé
router.put('/:id', employeeController.updateEmployee);

// supprimer un employé
router.delete('/:id',employeeController.deleteEmployee);

module.exports = router;