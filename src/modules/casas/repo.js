
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class casasRepository {
    async last(){
        let response = 'error';
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM casas as t INNER JOIN colaborador as c ON t.id_colaborador = c.id ORDER BY t.id DESC LIMIT 1`;
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'error'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
        }

        return response
    }

 
    async getAll() {
        let response = 'error'
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM casas as t INNER JOIN colaborador as c ON t.id_colaborador = c.id `; 
            response =  await pool.query(queryString) 
            if(response.length >0){ 
                response = response
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
        }
        
        return response
    }

 

    async getById(id) {
        let response = 'error'; 
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM casas as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id = ${id} `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0] 
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
        }


        return response
    }

    async getByColaborador(id) {
        let response = 'error'
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM casas as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id_colaborador = ${id} `; 
            response =  await pool.query(queryString) 
            if(response.length >0){ 
                response = response
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
        }
        
        return response
    }

   

    async delete(id) {
     
        let response = 'No fue posible eliminar el registro..';
      
        try {
                const queryString2 = `SELECT * FROM casas WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }
    
    
        try {
            const queryString2 = `DELETE FROM casas_fotos WHERE id_casa = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

       
        try {
            const queryString2 = `DELETE FROM casas WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }



    async create({id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas , cuartos, banos, cochera, superficie_casa}) {
        let response = 'error'; 
      
      

       
        try {
            const queryString3 = `SELECT * FROM colaborador WHERE id = ${id_colaborador}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Colaborador no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }


      
        const queryString2 = `INSERT INTO casas (id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas, cuartos, banos, cochera, superficie_casa)   VALUES (  ${id_colaborador} , '${titulo}' , '${estatus}', '${renta}', '${tipo}',' ${descripcion}', '${ubicacion}', ${precio}, '${superficie}',  '${iframe}', '${detalles}', '${etiquetas}' , ${cuartos}, ${banos}, ${cochera}, '${superficie_casa}' )`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update({id,id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas , cuartos, banos, cochera, superficie_casa}) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
    
       
        try {
            const queryString3 = `SELECT * FROM casas WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



        const queryString2 = `UPDATE casas SET 
         id_colaborador = ${id_colaborador} , titulo = '${titulo}' , estatus = '${estatus}', renta = '${renta}', 
         tipo = '${tipo}', descripcion = '${descripcion}', ubicacion = '${ubicacion}', precio = ${precio}, superficie = '${superficie}',
         iframe = '${iframe}', detalles = '${detalles}',etiquetas =  '${etiquetas}' , cuartos = ${cuartos}, banos = ${banos}, cochera = ${cochera}, superficie_casa = '${superficie_casa}' , updated_at = '${update}' 
         WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }



    /** FOTOS */

    async getFotosByCasa(id) {
        let response = []
        try {
            const queryString = `SELECT  *  FROM casas_fotos  WHERE id_casa = ${id} `; 
            response =  await pool.query(queryString) 
            if(response.length >0){ 
                response = response
            }else{
                response = []
            }
        } catch(error) {
            console.log(error);
        }
        
        return response
    }
    async getFotoById(id) {
        let response = {}
        try {
            const queryString = `SELECT  *  FROM casas_fotos  WHERE id = ${id} `; 
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0] 
            }else{
                response = {}
            }
        } catch(error) {
            console.log(error);
        }
        
        return response
    }


    async createFoto({id_casa , image}) {
        let response = 'error'; 
        try {
            const queryString3 = `SELECT * FROM casas WHERE id = ${id_casa}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Casa no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }

        try {
            const queryString2 = `INSERT INTO casas_fotos (id_casa , image)  VALUES (  ${id_casa} , '${image}')`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }

    async deleteFoto(id) {
     
        let response = 'No fue posible eliminar el registro..';
      
        try {
                const queryString2 = `SELECT * FROM casas_fotos WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }


       
        try {
            const queryString2 = `DELETE FROM casas_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }

    async updatePortada({id, id_casa}) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
    
       
        try {
            const queryString3 = `SELECT * FROM casas_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



      
        try {
            await pool.query(`UPDATE casas_fotos SET portada = 'no'  WHERE id_casa = ${id_casa} `) 
            const queryString2 = `UPDATE casas_fotos SET portada = 'si' , updated_at = '${update}'  WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
        return response
    }



  




};

module.exports = casasRepository;
