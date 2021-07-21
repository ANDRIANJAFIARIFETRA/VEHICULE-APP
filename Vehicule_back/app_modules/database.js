const connector = require('../database/database');

class Database {

    constructor() {}

    select(table, selector="*", where = '') {

        return new Promise((resolve, reject) => {

            if(where != ''){
                where = `where ${where}`;
            }

            connector.query(`select ${selector} from ${table} ${where}`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })

        })

    }

    update(table, data, where = '') {

        return new Promise((resolve, reject) => {
            if (where != '') {
                where = `where ${where}`;
            }
            connector.query(`update ${table} set ? ${where}`, data, (err, result) => {
                if (err) {
                    reject(err);
                } else if(result.affectedRows != 0) {
                    resolve('updated');
                }else{
                    reject(err)
                }
            })
        })
    }

    insert(table, data) {
        return new Promise((resolve, reject) => {
            connector.query(`insert into ${table} set ?`, data, (err, result) => {
                if (err) {
                    reject(err);
                } else if(result.affectedRows != 0) {
                    resolve('saved');
                }else{
                    reject(err)
                }
            })
        })
    }

    delete(table, where) {
        return new Promise((resolve, reject) => {
            if (where != null) {
                where = `where ${where}`;
            }
            connector.query(`delete from ${table} ${where}`, (err, result) => {
                if (err) {
                    reject(err);
                }else if(result.affectedRows != 0){
                    resolve('deleted')
                }else{
                    reject(err)
                }
            })
        })
    }

    getLastRow(table) {
        
        return new Promise((resolve, reject) => {
            connector.query(`select * from ${table}`, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    let data = {};
                    result.map(el => {
                        data = el;
                    })                              
                    resolve(data);
                }
            })
        }) 

    }

    execute(query) {

        return new Promise((resolve, reject) => {
            connector.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })

    }
    

}

module.exports = Database

