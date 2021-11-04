
const EmployeeModel = require('../models/employee.model');

// obtenir la liste de tous les employés
exports.getEmployeeList = (req, res)=> {
    //console.log('Voici la liste de tous les employés');
    EmployeeModel.getAllEmployees((err, employees) =>{
        console.log('nous sommes là');
        if(err)
        res.send(err);
        console.log('Employés', employees);
        res.send(employees)
    })
}

// obtenir l’identité de l’employé
exports.getEmployeeByID = (req, res)=>{
    //console.log('se faire trouver par id');
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        console.log('données sur un seul employé',employee);
        res.send(employee);
    })
}

// créer un nouvel employé
exports.createNewEmployee = (req, res) =>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'veuiller remplir tous les champs'});
    }else{
        EmployeeModel.createEmployee(employeeReqData, (err, employee)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Employé créé avec succès', data: employee.insertId})
        })
    }
}

// mettre à jour l’employé
exports.updateEmployee = (req, res)=>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'veuillez remplir tous les champs'});
    }else{
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Employé mis à jour avec succès'})
        })
    }
}

// supprimer un employé
exports.deleteEmployee = (req, res)=>{
    EmployeeModel.deleteEmployee(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Employé supprimé avec succès!'});
    })
}