const databases = require('../../app_modules/database'),
      database = new databases();

class Marque {

    getAllMarque(){
        
        return new Promise((resolve, reject) => {
            database.select('marque', '*').then(res => {
                if(res) resolve(res)
                else reject(res)
            }).catch(err => reject(err));
        })

    }
    addMarque(data){

        return new Promise((resolve, reject) => {

            database.select('marque', '*', `libelle_marque = '${data.libelle_marque}'`).then(res => {

                if(res.length == 0){
                    database.insert('marque', data).then((res) => {

                        if(res == 'saved'){
                            resolve("Marque Ajouté");
                        }else{
                            reject(res);
                        }
                    }).catch((err) => reject(err))
                }else{
                    reject('Marque véhicule existe deja')
                }

            })

        })

    }

    getMarqueById(id){

        return new Promise((resolve, reject) => {
            database.select('marque', '*', `code_marque = '${id}'`).then(res => {
                if(res.length > 0) resolve(res)
                else reject(res)
            }).catch(err => reject(err));
        })

    }

    updateMarque(data, id){

        return new Promise((resolve, reject) => {

            database.update('marque', data, `code_marque = '${id}'`).then((res => {

                if (res == 'updated') {
                    resolve("Marque modifié");
                }else{
                    reject(res)
                }
    
            })).catch(err => reject(err));

        })

    }

}

module.exports = Marque