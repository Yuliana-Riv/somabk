
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class localesRepository {
    async last(){
        let response = 'error';
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM locales as t INNER JOIN colaborador as c ON t.id_colaborador = c.id ORDER BY t.id DESC LIMIT 1`;
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM locales as t INNER JOIN colaborador as c ON t.id_colaborador = c.id `; 
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM locales as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id = ${id} `;
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM locales as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id_colaborador = ${id} `; 
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
                const queryString2 = `SELECT * FROM locales WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }
    
    
        try {
            const queryString2 = `DELETE FROM locales_fotos WHERE id_local = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

       
        try {
            const queryString2 = `DELETE FROM locales WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }



    async create({id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas }) {
        let response = 'error'; 
      
      

       
        try {
            const queryString3 = `SELECT * FROM colaborador WHERE id = ${id_colaborador}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Colaborador no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }


      
        const queryString2 = `INSERT INTO locales (id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas)   VALUES (  ${id_colaborador} , '${titulo}' , '${estatus}', '${renta}', '${tipo}',' ${descripcion}', '${ubicacion}', ${precio}, '${superficie}',  '${iframe}', '${detalles}', '${etiquetas}'  )`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update({id,id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas}) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
    
       
        try {
            const queryString3 = `SELECT * FROM locales WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



        const queryString2 = `UPDATE locales SET 
         id_colaborador = ${id_colaborador} , titulo = '${titulo}' , estatus = '${estatus}', renta = '${renta}', 
         tipo = '${tipo}', descripcion = '${descripcion}', ubicacion = '${ubicacion}', precio = ${precio}, superficie = '${superficie}',
         iframe = '${iframe}', detalles = '${detalles}',etiquetas =  '${etiquetas}'  , updated_at = '${update}' 
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

    async getFotosByLocal(id) {
        let response = []
        try {
            const queryString = `SELECT  *  FROM locales_fotos  WHERE id_local = ${id} `; 
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
            const queryString = `SELECT  *  FROM locales_fotos  WHERE id = ${id} `; 
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


    async createFoto({id_local , image}) {
        let response = 'error'; 
        try {
            const queryString3 = `SELECT * FROM locales WHERE id = ${id_local}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Local no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }

        try {
            const queryString2 = `INSERT INTO locales_fotos (id_local , image)  VALUES (  ${id_local} , '${image}')`;
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
                const queryString2 = `SELECT * FROM locales_fotos WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }


       
        try {
            const queryString2 = `DELETE FROM locales_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }

    async updatePortada({id, id_local}) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
    
       
        try {
            const queryString3 = `SELECT * FROM locales_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



      
        try {
            await pool.query(`UPDATE locales_fotos SET portada = 'no'  WHERE id_local = ${id_local} `) 
            const queryString2 = `UPDATE locales_fotos SET portada = 'si' , updated_at = '${update}'  WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
        return response
    }



  




};

module.exports = localesRepository;
