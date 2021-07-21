const router = require('express').Router()
const tokenChecker = require('../app_modules/tokenCheker')
const vehiculeEntity = require('../entites/vehicule/vehicule.entity')
const MarqueEntity = require('../entites/marque/marque.entity');
const Vehicule = require('../entites/vehicule/vehicule.entity');
const vehicule = new vehiculeEntity;
const Marque = new MarqueEntity;

router.get('/all', (req, res) => {

    vehicule.getAllVehicule().then(vhcl =>{
        res.json({status:true, data:vhcl, message:'Liste des véhicules'})
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/last_row', (req, res) => {

    vehicule.getLastRowVehicule().then(vhcl => {
        res.json({
            data:vhcl,
            message:'Dernier enregistrement',
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/all/view', (req, res) => {

    vehicule.getAllVehiculeView().then(vhcl =>{
        res.json({status:true, data:vhcl, message:'Liste des véhicules'})
    }).catch(err => res.json({status:false, message:err}))

})

router.post('/add', (req, res) => {

    vehicule.addVehicule(req.body).then(vhcl => {
        res.json({
            message:vhcl, 
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/:id', (req, res) => {

    vehicule.getVehiculeById(req.params.id).then(vhcl => {
        res.json({status:true, data:vhcl, message:'Véhicule Récupéré'})
    }).catch(err => res.json({status:false, message:err}))

})


router.put('/update/:id', (req, res) => {

    vehicule.updateVehicule(req.body, req.params.id).then(vhcl => {
        res.json({
            message:vhcl,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.delete('/delete/:id', (req, res) => {

    vehicule.deleteVehicule(req.params.id).then(vhcl => {
        res.json({
            message:vhcl, 
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/categorie/all' , (req , res)=>{

    vehicule.getAllCategorie().then(categories => {
        res.json({
            message:'Toutes les catégories',
            data:categories,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/marque/all' , (req , res)=>{

    Marque.getAllMarque().then(marque =>{
        res.json({
            message:'Toutes les marques',
            data:marque,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})


router.post('/marque/add', (req, res) => {

    Marque.addMarque(req.body).then(marque => {
        res.json({
            message:marque, 
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.get('/marque/get/:id', (req, res) => {

    Marque.getMarqueById(req.params.id).then(marque => {
        res.json({
            data:marque,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.post('/marque/put/:id', (req, res) => {

    // res.json({param:req.params.id});
    Marque.updateMarque(req.body, req.params.id).then(marque => {
        res.json({
            message:marque,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.post('/search', (req, res) => {
    // res.json({key:req.body.key});
    vehicule.searchFilter(req.body.key).then(vhcl => {
        res.json({
            data:vhcl,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})

router.post('/filter', (req, res) => {
    // res.json({key:req.body.key});
    vehicule.filter(req.body.key, req.body.value).then(vhcl => {
        res.json({
            data:vhcl,
            status:true
        })
    }).catch(err => res.json({status:false, message:err}))

})





module.exports  = router