const databases = require('../../app_modules/database'),
      database = new databases();

class Vehicule {

    constructor() {}

    /**=====================Categorie======================== */
    getAllCategorie(){
        
        return new Promise((resolve, reject) => {

            database.select('categorie', '*').then(res => {
                if(res){
                    resolve(res)
                }else{
                    reject(res)
                }
            }).catch(err => reject(err))

        })
    }

   
    /**===================Vehicule========================== */

    getAllVehicule(){

        return new Promise((resolve, reject) => {

            database.select('vehicule', '*').then((res) => {
                if(res.length > 0){
                    resolve(res)
                }else{
                    reject(res)
                }
            }).catch(err => reject(err));

        })

    }
    
    getAllVehiculeView(){

        return new Promise((resolve, reject) => {

            database.select('vehicule_view', '*').then((res) => {
                if(res.length > 0){
                    resolve(res)
                }else{
                    reject(res)
                }
            }).catch(err => reject(err));

        })

    }

    getVehiculeById(id){

        return new Promise((resolve, reject) => {
            database.select('vehicule_view', '*',  `code_vehicule = '${id}'`).then(res => {

                if(res.length > 0){
                    resolve(res)
                }else{
                    reject(res)
                }

            }).catch(err => reject(err))
        })

    }

    addVehicule(data){

        return new Promise((resolve, reject) => {

            database.select('vehicule', '*', `code_vehicule = '${data.code_vehicule}' or libelle_vehicule = '${data.libelle_vehicule}'`).then(res =>{

                if(res.length == 0){
                    database.insert('vehicule', data).then((res) => {

                        if(res == 'saved'){
                            resolve("Vehicule Ajouté avec succès");
                        }else{
                            reject(res);
                        }
                    }).catch((err) => reject(err))
                }else{
                    reject('Véhicule existe déjà')
                }

            })

        })


    }

    updateVehicule(data, id){

        return new Promise ((resolve, reject) => {

            database.update('vehicule', data, `code_vehicule = '${id}'`).then(res => {

                if(res == 'updated'){
                    resolve('Véhicule modifié avec succès')
                }else{
                    reject(res)
                }

            }).catch(err => reject(err))

        })
    }

    deleteVehicule(id){

        return new Promise((resolve, reject) => {

            database.delete('vehicule', `code_vehicule = '${id}'`).then((res) => {

                if(res == 'deleted'){ 
                    resolve("Vehicule Suprimé");
                }else{
                    reject(res);
                }
            }).catch((err) => reject(err))

        })
    }

    getLastRowVehicule(){

        return new Promise((resolve, reject) => {

            database.getLastRow('vehicule').then(data => {

                if(data){
                    resolve(data)
                }else{
                    reject('Impossible de recupérer la dernière colone')
                }

            }).catch(err => {
                reject(err)
            })

        })
        
    }

    searchFilter(key){

        return new Promise((resolve, reject) => {

            database.select('vehicule_view', '*', `code_vehicule LIKE '%${key}%' OR libelle_vehicule LIKE '%${key}%' OR libelle_marque LIKE '%${key}%' OR  libelle_cat LIKE '%${key}%' OR desc_vehicule LIKE '%${key}%' `)
            .then(res => {

                if(res.length > 0){
                    resolve(res)
                }else{
                    reject(res)
                }

            }).catch(err => reject(err))

        })

    }

    filter(key, value){

        return new Promise((resolve, reject) => {

            database.select('vehicule_view', '*', `${key} = '${value}'`)
            .then(res => {

                if(res.length > 0){
                    resolve(res)
                }else{
                    reject(res)
                }

            }).catch(err => reject(err))

        })

    }

}


module.exports = Vehicule;