'use strict'

class oficinasModel {
    constructor(repository){
        this.repository = repository;
    }
    async last() {
        let response;

        try {
            response = await  this.repository.last();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getAll() {
        let response;

        try {
            response = await  this.repository.getAll();
         
        } catch(error) {
            throw error;
        }

        return  response;
    }
    async getByColaborador(id) {
        let response;

        try {
            response = await  this.repository.getByColaborador(id);
         
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getById(id) {
        let response;

        try {
            response = await  this.repository.getById(id);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

 
   
    async update(data) {
        let response;

        try {
            response = await  this.repository.update(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async create(data) {
        let response;

        try {
            response = await  this.repository.create(data);
          
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async delete(data) {
        let response;

        try {
            response = await  this.repository.delete(data);
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async getFotosByOficina(id) {
        let response;

        try {
            response = await  this.repository.getFotosByOficina(id);
        } catch(error) {
            throw error;
        }

        return  response;
    }
    async getFotoById(id) {
        let response;

        try {
            response = await  this.repository.getFotoById(id);
        } catch(error) {
            throw error;
        }

        return  response;
    }


    async createFoto(data) {
        let response;

        try {
            response = await  this.repository.createFoto(data);
        } catch(error) {
            throw error;
        }

        return  response;
    }

    async deleteFoto(id) {
     
        let response;

        try {
            response = await  this.repository.deleteFoto(id);
        } catch(error) {
            throw error;
        }

        return  response;
    }
    async updatePortada(data) {
        let response;

        try {
            response = await  this.repository.updatePortada(data);
        } catch(error) {
            throw error;
        }

        return  response;
    }


};

module.exports = oficinasModel;