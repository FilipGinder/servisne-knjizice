const Sk = require('../models/sk.models');

module.exports.pregled_svih_klijenata = (req, res) => {
    console.log("create")
  
    return new Promise((resolve,reject) => {
        Sk.pregled_svih_klijenata(res).then((data)=>{
            res.status(200).send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Greška kontaktirajte administratora.'
            });
        })
    })

};


module.exports.sve_o_klijentu = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.sve_o_klijentu(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}



module.exports.dod_nov_klijenta = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.dod_nov_klijenta(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}



module.exports.pretraga_knjizica = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.pretraga_knjizica(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}



module.exports.sva_klijentova_vozila = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.sva_klijentova_vozila(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}


module.exports.svi_vozilovi_servisi = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.svi_vozilovi_servisi(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}


module.exports.login = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.login(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}


module.exports.dodavanje_jos_jednog_vozila = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.dodavanje_jos_jednog_vozila(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}

module.exports.dodavanje_jos_jednog_vozila_klijenta = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.dodavanje_jos_jednog_vozila_klijenta(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}

module.exports.sve_o_vozilu = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.sve_o_vozilu(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}


module.exports.izmena_klijenta = function (req,res) {

    console.log("create")
        return new Promise((resolve,reject) => {
            Sk.izmena_klijenta(req).then((data)=>{
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Greška kontaktirajte administratora.'
                });
            })
        })

}
