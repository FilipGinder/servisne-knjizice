const sql = require("../../db/konekcija").pool;
const express = require('express');
const router = express.Router();

const Sk = {};

Sk.pregled_svih_klijenata = (res) => {

    const sqlString = `select * from klijenti`;

   
           return new Promise((resolve, reject) => {
               sql.query(sqlString,
                   (error, rows, fields) => {
                       if (error) {
                           reject(error);
                           return 1;
                       } else {
                           resolve(rows);
                       }
                   });


           });
};




Sk.sve_o_klijentu = data => {

    let sqlQuery = `SELECT
                    
                    k.id,
                    k.ime,
                    k.prezime,
                    k.telefon,
                    k.email,
                    k.unique_key            
                  
                    FROM klijenti k
                    WHERE k.ID = ${data.body.id_klijenta}`

      
    return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                    resolve(rows);
                }
            });
       });
};




Sk.dod_nov_klijenta = data => {

    function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
                charactersLength));
            }
            return result;
        }
     var unique_key =  makeid(7);

   let sqlQuery = `SELECT COUNT(*) AS broj FROM klijenti  WHERE unique_key = "${unique_key}"`  /*${unique_key}*/  
   return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                   var br = JSON.stringify(rows[0].broj);    
                   if(br == 0){
                                const sqlString = `INSERT INTO klijenti (ime,prezime,telefon,email,unique_key) VALUES ('${data.body.ime}','${data.body.prezime}','${data.body.telefon}','${data.body.email}','${unique_key}')`;              
                              //  return new Promise((resolve1, reject1) => {
                                    sql.query(sqlString,
                                        (error, rowss, fields) => {
                                            if (error) {
                                                reject1(error);
                                                return 1;
                                            } else {
                                                 resolve({id: rowss.insertId});
                                            }
                                        });             
                                 //   });
                    }
               }
           });
      });
};






Sk.pretraga_knjizica = data => {

    let sqlQuery = `SELECT
                    
                    k.id,
                    k.ime,
                    k.prezime,
                    k.telefon,
                    k.email            
                  
                    FROM klijenti k
                    WHERE k.unique_key LIKE "${data.body.kor_kod}"`

      
    return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                    resolve(rows);
                }
            });
       });
};





Sk.sva_klijentova_vozila = data => {

    let sqlQuery = `SELECT
                    
                    v.id,
                    v.naziv           
                
                    FROM vozila v
                    WHERE v.id_klijenta = "${data.body.id_klijenta}"
                    ORDER BY v.id DESC`
      
    return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                    resolve(rows);
                }
            });
       });
};


Sk.svi_vozilovi_servisi = data => {

    let sqlQuery = `SELECT
                    
                    s.id,
                    s.kilometraza, 
                    DATE_FORMAT(s.vreme_servisa,'%d/%m/%Y') AS vreme_servisa,
                    s.opis
  
                    FROM servisi s
                    WHERE s.id_vozila = "${data.body.id_klijenta}"
                    ORDER BY s.vreme_servisa DESC`
      
    return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                    resolve(rows);
                }
            });
       });
};




Sk.login = data => {
    
    const username = data.body.username;
    const pass = data.body.password;

    let sqlQuery = `SELECT id,password FROM admini WHERE email='${username}' `     
    return new Promise((resolve, reject) => {
        sql.query(sqlQuery,
            (error, rows, fields) => {
                if (error) {
                    reject(error);
                    return 1;
                } else {
                    if(rows.length > 0){
                            //  resolve({password: rows[0].password});    //pas iz baze
                            const password = Buffer.from(rows[0].password, 'base64').toString('ascii');  //pass iz baze pretvaramo u normalan text

                            if(pass === password){
                                const id_korisnika = rows[0].id;
                                resolve({id_korisnika: id_korisnika});
                            } else{
                                resolve({poruka: "Pogresna lozinka"});
                            }                
                    } else {
                        resolve({poruka: "Pogresan username"}); ///????? ne radi..... tj ne vraca ovo
                    }
                    
                }
            });
       });
};




Sk.dodavanje_jos_jednog_vozila = data => {
    
    const naziv_vozila = data.body.naziv_vozila;
    const godiste_vozila = data.body.godiste_vozila;
    const kubikaza_vozila = data.body.kubikaza_vozila;
    const boja_vozila = data.body.boja_vozila;
    const kilometraza_vozila = data.body.kilometraza_vozila;
    const gorivo = data.body.gorivo;
    const opis_servisa = data.body.opis_servisa;
    const id_klijenta = data.body.id_klijenta;
 
    const sqlString = `INSERT INTO vozila (id_klijenta,naziv,godiste,kubikaza,boja,kilometraza,vrsta_goriva) VALUES (${id_klijenta},'${naziv_vozila}','${godiste_vozila}','${kubikaza_vozila}','${boja_vozila}','${kilometraza_vozila}','${gorivo}')`;              
                      return new Promise((resolve, reject) => {
                        sql.query(sqlString,
                            (error, rowss, fields) => {
                                if (error) {
                                    reject1(error);
                                    return 1;
                                } else {
                                        //    resolve({id: rowss.insertId});
                                            const sqlString = `INSERT INTO servisi (id_vozila,kilometraza,opis) VALUES (${rowss.insertId},'${kilometraza_vozila}','${opis_servisa}')`;              
                                        //  return new Promise((resolve1, reject1) => {
                                                sql.query(sqlString,
                                                    (error, rowss, fields) => {
                                                        if (error) {
                                                            reject1(error);
                                                            return 1;
                                                        } else {
                                                            resolve({poruka: "uspesno"});
                                                        }
                                                    });             
                                            //   });

                                }
                            });             
                           });

};




Sk.dodavanje_jos_jednog_vozila_klijenta = data => {
    
    const naziv_vozila = data.body.naziv;
    const godiste_vozila = data.body.godiste;
    const kubikaza_vozila = data.body.kubikaza;
    const boja_vozila = data.body.boja;
    const kilometraza_vozila = data.body.kilometraza;
    const gorivo = data.body.gorivo;
    const id_klijenta = data.body.id_klijenta;
 
    const sqlString = `INSERT INTO vozila (id_klijenta,naziv,godiste,kubikaza,boja,kilometraza,vrsta_goriva) VALUES (${id_klijenta},'${naziv_vozila}','${godiste_vozila}','${kubikaza_vozila}','${boja_vozila}','${kilometraza_vozila}','${gorivo}')`;              
                      return new Promise((resolve, reject) => {
                        sql.query(sqlString,
                            (error, rowss, fields) => {
                                if (error) {
                                    reject1(error);
                                    return 1;
                                } else {
                                        
                                        resolve({poruka: "uspesno"});
                                                      
                                }
                            });             
                           });

};







Sk.sve_o_vozilu = data => {

    const id_vozila = data.body.id_vozila;
 
    let sqlString = `SELECT 
    
                        v.id,
                        v.naziv,
                        v.godiste,
                        v.kubikaza,
                        v.boja,
                        v.kilometraza,
                        v.vrsta_goriva 
                        FROM vozila v 
                        WHERE v.id = ${id_vozila}`             
                      return new Promise((resolve, reject) => {
                        sql.query(sqlString,
                            (error, rows, fields) => {
                                if (error) {
                                    reject1(error);
                                    return 1;
                                } else {
                                        
                                    resolve(rows);
                                                      
                                }
                            });             
                           });

};







Sk.izmena_klijenta = data => {

    const id_klijenta = data.body.id_klijenta;
    const ime_klijenta_izm = data.body.ime_klijenta_izm;
    const prezime_klijenta_izm = data.body.prezime_klijenta_izm;
    const telefon_klijenta_izm = data.body.telefon_klijenta_izm;
    const email_klijenta_izm = data.body.email_klijenta_izm;

    const naziv_vozila = data.body.naziv_vozila;
    const godiste_vozila = data.body.godiste_vozila;
    const kubikaza_vozila = data.body.kubikaza_vozila;
    const boja_vozila = data.body.boja_vozila;
    const kilometraza_vozila = data.body.kilometraza_vozila;
    const gorivo = data.body.gorivo;
    const id_vozila = data.body.id_vozila;

    const servis_opis_nov = data.body.servis_opis_nov;
    const kilometraza_izm_nova = data.body.kilometraza_izm_nova;
 
    let sqlString = `UPDATE klijenti SET  
                            ime = '${ime_klijenta_izm}', 
                            prezime = '${prezime_klijenta_izm}' , 
                            telefon = '${telefon_klijenta_izm}', 
                            email = '${email_klijenta_izm}'
                            WHERE  id = '${id_klijenta}'`             
                      return new Promise((resolve, reject) => {
                        sql.query(sqlString,
                            (error, rows, fields) => {
                                if (error) {
                                    reject(error);
                                    return 1;
                                } else {
                                
                                            let sqlString1 = `UPDATE vozila SET  
                                                                naziv = '${naziv_vozila}', 
                                                                godiste = '${godiste_vozila}' , 
                                                                kubikaza = '${kubikaza_vozila}', 
                                                                boja = '${boja_vozila}',
                                                                kilometraza = '${kilometraza_vozila}',
                                                                vrsta_goriva = '${gorivo}'
                                                            WHERE  id = '${id_vozila}'`  
                                                sql.query(sqlString1,
                                                    (error, rowss, fields) => {
                                                        if (error) {
                                                            reject(error);
                                                            return 1;
                                                        } else {

                                                                    if(servis_opis_nov != ""){
                                                                        let sqlString2 = `INSERT INTO servisi (id_vozila,kilometraza,opis) values ('${id_vozila}','${kilometraza_izm_nova}','${servis_opis_nov}')` 
                                                                        sql.query(sqlString2,
                                                                            (error, rowsss, fields) => {
                                                                                if (error) {
                                                                                    reject(error);
                                                                                    return 1;
                                                                                } else {
                                                                                    resolve({poruka: "uspesno"});
                                                                                }
                                                                            }); 
                                                                         }else{
                                                                            resolve({poruka: "nema servisa"});
                                                                         }
                                                                             
                                                                }
                                                            });                                                                                                                                 
                                                      
                                        }
                                    });             
                                });




  

                        

};


module.exports = Sk;