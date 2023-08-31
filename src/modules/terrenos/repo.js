
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class terrenosRepository {
    async last(){
        let response = 'error';
        try {
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM terrenos as t INNER JOIN colaborador as c ON t.id_colaborador = c.id ORDER BY t.id DESC LIMIT 1`;
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM terrenos as t INNER JOIN colaborador as c ON t.id_colaborador = c.id `; 
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM terrenos as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id = ${id} `;
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
            const queryString = `SELECT t.*, CONCAT(c.name, ' ', c.lastname) as colb_fullname, c.name as colb_name , c.lastname as colb_lastname, c.email as colb_email, c.phone as colb_phone, c.wlink as colb_wlink, c.image as colb_image FROM terrenos as t INNER JOIN colaborador as c ON t.id_colaborador = c.id WHERE t.id_colaborador = ${id} `; 
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
                const queryString2 = `SELECT * FROM terrenos WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }
    
    
        try {
            const queryString2 = `DELETE FROM terrenos_fotos WHERE id_terreno = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

       
        try {
            const queryString2 = `DELETE FROM terrenos WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }


    async create({id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas}) {
        let response = 'error'; 
      
      

       
        try {
            const queryString3 = `SELECT * FROM colaborador WHERE id = ${id_colaborador}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Colaborador no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }


      
        const queryString2 = `INSERT INTO terrenos (id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas) 
        VALUES (
            ${id_colaborador} , '${titulo}' , '${estatus}', '${renta}', '${tipo}',' ${descripcion}', '${ubicacion}', ${precio}, '${superficie}', '${iframe}', '${detalles}', '${etiquetas}'
         )`;
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
            const queryString3 = `SELECT * FROM terrenos WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



        const queryString2 = `UPDATE terrenos SET 
         id_colaborador = ${id_colaborador} , titulo = '${titulo}' , estatus = '${estatus}', renta = '${renta}', 
         tipo = '${tipo}', descripcion = '${descripcion}', ubicacion = '${ubicacion}', precio = ${precio}, superficie = '${superficie}',
         iframe = '${iframe}', detalles = '${detalles}',etiquetas =  '${etiquetas}' , updated_at = '${update}' 
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

    async getFotosByTerreno(id) {
        let response = []
        try {
            const queryString = `SELECT  *  FROM terrenos_fotos  WHERE id_terreno = ${id} `; 
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
            const queryString = `SELECT  *  FROM terrenos_fotos  WHERE id = ${id} `; 
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


    async createFoto({id_terreno , image}) {
        let response = 'error'; 
        try {
            const queryString3 = `SELECT * FROM terrenos WHERE id = ${id_terreno}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0)return 'Terreno no encontrado.'
        } catch(error) {
            console.log(error);
            return response
        }

        try {
            const queryString2 = `INSERT INTO terrenos_fotos (id_terreno , image)  VALUES (  ${id_terreno} , '${image}')`;
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
                const queryString2 = `SELECT * FROM terrenos_fotos WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length ==0) return 'Registro no valido.'
        } catch(error) {
            console.log(error);
        }


       
        try {
            const queryString2 = `DELETE FROM terrenos_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            if(response.affectedRows > 0) response = 'success';
        } catch(error) {
            console.log(error);
        }

        return response
    }

    async updatePortada({id, id_terreno}) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
    
       
        try {
            const queryString3 = `SELECT * FROM terrenos_fotos WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0) return 'No se encontro el registro.'
        } catch(error) {
            console.log(error);
            return 'error'
        }



      
        try {
            await pool.query(`UPDATE terrenos_fotos SET portada = 'no'  WHERE id_terreno = ${id_terreno} `) 
            const queryString2 = `UPDATE terrenos_fotos SET portada = 'si' , updated_at = '${update}'  WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
        return response
    }



  




};

module.exports = terrenosRepository;
