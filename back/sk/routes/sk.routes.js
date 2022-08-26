const express = require('express');
const controller = require('../controllers/sk.controllers')  //moje

const router = express.Router();


// localhost:7000/api/glavna
//u app.js namesteno da sve rote budu samo posle  localhost:7000 ....   umesto da gadja celu putanju   localhost:7000/back/sk

router.get('/pregled_svih_klijenata',controller.pregled_svih_klijenata);
router.post('/sve_o_klijentu',controller.sve_o_klijentu);  
router.post('/dod_nov_klijenta',controller.dod_nov_klijenta); 
router.post('/pretraga_knjizica',controller.pretraga_knjizica);
router.post('/sva_klijentova_vozila',controller.sva_klijentova_vozila); 
router.post('/svi_vozilovi_servisi',controller.svi_vozilovi_servisi); 
router.post('/dodavanje_jos_jednog_vozila',controller.dodavanje_jos_jednog_vozila); 
router.post('/dodavanje_jos_jednog_vozila_klijenta',controller.dodavanje_jos_jednog_vozila_klijenta); 
router.post('/sve_o_vozilu',controller.sve_o_vozilu); 
router.post('/izmena_klijenta',controller.izmena_klijenta); 



router.post('/login',controller.login); 

module.exports = router;