var dbConn  = require('../../config/db.config');

var Employee = function(employee){
    this.first_name     =   employee.first_name;
    this.last_name      =   employee.last_name;
    this.email          =   employee.email;
    this.phone          =   employee.phone;
    this.organization   =   employee.organization;
    this.designation    =   employee.designation;
    this.salary         =   employee.salary;
    this.status         =   employee.status ? employee.status : 1;
    this.created_at     =   new Date();
    this.updated_at     =   new Date();
}

// obtenir tous les employés
Employee.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM employees WHERE is_deleted=0', (err, res)=>{
        if(err){
            console.log('Erreur lors de la récupération d’un employé', err);
            result(null,err);
        }else{
            console.log('Employés récupérés avec succès');
            result(null,res);
        }
    })
}

// obtenir l’identité de l’employé à partir de la base de données
Employee.getEmployeeByID = (id, result)=>{
    dbConn.query('SELECT * FROM employees WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Erreur lors de la récupération de l’employé par id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// créer un nouvel employé
Employee.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO employees SET ? ', employeeReqData, (err, res)=>{
        if(err){
            console.log('Erreur lors de l’insertion de données');
            result(null, err);
        }else{
            console.log('Employé créé avec succès');
            result(null, res)
        }
    })
}

// mettre à jour l’employé
Employee.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employeeReqData.first_name,employeeReqData.last_name,employeeReqData.email,employeeReqData.phone,employeeReqData.organization,employeeReqData.designation,employeeReqData.salary, id], (err, res)=>{
        if(err){
            console.log('Erreur lors de la mise à jour de l’employé');
            result(null, err);
        }else{
            console.log("Employé mis à jour avec succès");
            result(null, res);
        }
    });
}

// supprimer un employé
Employee.deleteEmployee = (id, result)=>{
    // dbConn.query('DELETE FROM employees WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Erreur lors de la suppression de l’employé');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE employees SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Erreur lors de la suppression de l’employé');
            result(null, err);
        }else{
            console.log("Employé supprimé avec succès");
            result(null, res);
        }
    });
}

module.exports = Employee;