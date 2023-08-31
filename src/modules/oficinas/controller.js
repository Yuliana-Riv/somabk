"use strict"
var oficinasModel =require( "./model");
var oficinasRepo = require("./repo");
var colaboradorModel =require( "../colaborador/model");
var colaboradorRepo = require("../colaborador/repo");


var fs = require("fs");
var path = require('path')


var ncrypt = require("../../services/ncrypt/index")

const webp=require('webp-converter');

let validService = require("../../services/validator/validateParams")


const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);
 
    const _repoc = new colaboradorRepo();
    const _modelc = new colaboradorModel( _repoc);


    
    let result =[]
    let items = await _model.getAll();
    let status ='success'
    let message ='Listado de items.'

    const ncryptData = new ncrypt();

     if(Array.isArray(items)){
        let newarr =[]
        
        for (const item of items) {
            item.etiquetas = ncryptData._decryptData(item.etiquetas)
            item.detalles= ncryptData._decryptData(item.detalles)
            const fotos =await _model.getFotosByOficina(item.id)
            let portada =''
            if(Array.isArray(fotos)){
              let filt = fotos.filter(item => item.portada == 'si')
              filt.length>0 ? portada = filt[0].image : portada = fotos[0].image
            }
            newarr.push({
              ...item,
              portada,
              fotos
            });
        }
        result = newarr
     }else{
        status ='error'
        message = items;
     }

    return res.status(200).send({
        status:status,
        message: message,
        result: result,
    });
    
  },

  getById: async  (req, res) => {
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);



 
    let result=[];
    let status;
    let message='Item encontrado.'

  
    const validate = new validService()
    const id = req.params.id;
    let validid = validate.validNum(id)
    if(!validid){
        return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.',
        
        });
      }
  


    let item = await _model.getById(id);
   
    const ncryptData = new ncrypt();

    if(item.id){
      status = 'success'

      item.etiquetas = ncryptData._decryptData(item.etiquetas)
      item.detalles= ncryptData._decryptData(item.detalles)
      const fotos =await _model.getFotosByOficina(item.id)

      result = {...item, fotos}
    }else{
      status = 'error'
      message = item
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: result
    });
  },

  getByColaborador: async  (req, res) => {
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);



 
    let result=[];
    let status ='success'
    let message ='Listado de items.'

    const validate = new validService()
    const id = req.params.id;
    let validid = validate.validNum(id)
    if(!validid){
        return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.',
        
        });
      }
  


    let items = await _model.getByColaborador(id);

    const ncryptData = new ncrypt();

    if(Array.isArray(items)){
       let newarr =[]
       
       for (const item of items) {
           item.etiquetas = ncryptData._decryptData(item.etiquetas)
           item.detalles= ncryptData._decryptData(item.detalles)
           const fotos = await _model.getFotosByOficina(item.id)
           newarr.push({
             ...item,
             fotos
           });
       }
       result = newarr
    }else{
       status ='error'
       message = items;
    }

    return res.status(200).send({
        status:status,
        message: message,
        result: result,
       
    });
  },

 



  create: async (req, res) => {
    
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);
    let {id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas } = req.body
    let payload = req.user

    
  
    let status ='success';
    let message ='Registro creado con exito.'
    let result =''

    const validate = new validService()


    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }



   
    let vtitulo = validate.validParam(titulo)
    let vid = validate.validNum(id_colaborador)
    let vestatus = validate.validStatus(estatus)
    let vtipo = validate.validTipo(tipo)
    let vrenta = validate.validTrue(renta)
    let vprecio = validate.validNum(precio)


    if(!vprecio) return res.status(200).send({ status: 'error',   message: 'Precio no valido.',  result:'' });
    if(!vtitulo) return res.status(200).send({ status: 'error',   message: 'Titulo no valido.',  result:'' });
    if(!vid) return res.status(200).send({ status: 'error',   message: 'Colaborador no valido.',  result:'' });
    if(!vestatus) return res.status(200).send({ status: 'error',   message: 'Status no valido.',  result:'' });
    if(!vtipo) return res.status(200).send({ status: 'error',   message: 'Tipo no valido.',  result:'' });
    if(!vrenta) return res.status(200).send({ status: 'error',   message: 'Opcion de renta no valida.',  result:'' });


   
    const ncryptData = new ncrypt();

    etiquetas = ncryptData._encryptData(etiquetas)
    detalles = ncryptData._encryptData(detalles)
    const decodeEti = ncryptData._decryptData(etiquetas)
    const decodeDet = ncryptData._decryptData(detalles)
    // Todo correcto
    const  data ={id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas }
   
  
    result = await _model.create(data);
    let added ='_'

   if(result != 'success'){
     status='error'
     message=result
   }else{
       added = await _model.last()
       
       const ncryptData = new ncrypt();
       added.etiquetas = ncryptData._decryptData(added.etiquetas)
       added.detalles= ncryptData._decryptData(added.detalles)
       const fotos = await _model.getFotosByOficina(added.id)

       added ={
        ...added,
        fotos
       }
   }

   
   
   return res.status(200).send({
       message:message,
       status:status,
       result:result,
       added:added
   });
  

  },

  update: async(req, res) =>{
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);

    let {id,id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas}  = req.body

    let message='Registro actualizado con exito.'
    let result =''

    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    let getById = await _model.getById(id);

   
    //validar datos
    if(!getById.id){
      return res.status(200).send({
        status: 'error',
        message: 'Registro no encontrado.',
        result:result
      });
    }

    let vtitulo = validate.validParam(titulo)
    let vid_col = validate.validNum(id_colaborador)
    let vestatus = validate.validStatus(estatus)
    let vtipo = validate.validTipo(tipo)
    let vrenta = validate.validTrue(renta)
    let vprecio = validate.validNum(precio)
    let vdescripcion = validate.validParam(descripcion)
    let vubicacion = validate.validParam(ubicacion)
    let vsuperficie = validate.validParam(superficie)
    let viframe = validate.validParam(iframe)
    let vdetalles = validate.validParam(detalles)
    let vetiquetas = validate.validParam(etiquetas)

   

    !vtitulo ? titulo = getById.titulo : titulo 
    !vid_col ? id_colaborador = getById.id_colaborador : id_colaborador 
    !vestatus ? estatus = getById.estatus : estatus 
    !vtipo ? tipo = getById.tipo : tipo 
    !vrenta ? renta = getById.renta : renta 
    !vprecio ? precio = getById.precio : precio 
    !vdescripcion ? descripcion = getById.descripcion : descripcion 
    !vubicacion ? ubicacion = getById.ubicacion : ubicacion 
    !vsuperficie ? superficie = getById.superficie : superficie 
    !viframe ? iframe = getById.iframe : iframe 
   
    const ncryptData = new ncrypt();

   
    
   
   if(!vdetalles) {
     detalles = getById.detalles
   }else{
    detalles = ncryptData._encryptData(detalles)
   }

   if(!vetiquetas){
    etiquetas = getById.etiquetas
   }else{
    etiquetas = ncryptData._encryptData(etiquetas)
   }

    const decodeEti = ncryptData._decryptData(etiquetas)
    const decodeDet = ncryptData._decryptData(detalles)



    result = await _model.update({id,id_colaborador , titulo , estatus, renta, tipo, descripcion, ubicacion, precio, superficie, iframe, detalles, etiquetas});
    let status ='success';
    if(result != 'success'){
      status='error'
      message =result
    }
    return res.status(200).send({
        message:message,
        status:status
    });

      
  },

  updatePortada: async(req, res) =>{
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);

    let {id,id_oficina }  = req.body

    let message='Portada actualizada con exito.'
    let result =''

    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)
    let vid_oficina = validate.validNum(id_oficina)
    
    if(!validId  || !vid_oficina){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }


    result = await _model.updatePortada({id,id_oficina });
    let status ='success';
    if(result != 'success'){
      status='error'
      message =result
    }
    return res.status(200).send({
        message:message,
        status:status
    });

      
  },


  delete: async  (req, res) => {
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);
    const {id} = req.body;

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
      
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
       
      });
    }
   
   
    let validid = validate.validNum(id)
 
    if(!validid){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
       
      });
    }

    let item = await _model.getById(id);
    if(!item.id){
      return res.status(200).send({
        status: 'error',
        message: 'Registro no valido',
      });
    }
    let oficinasfotos = await _model.getFotosByOficina(id)

    let result = await _model.delete(id);
    let message;
    let status ='success';
    
    if(result =='success'){
      message ='Oficina eliminada'
    
      //! ELiminar imagenes.
      if(Array.isArray(oficinasfotos)){
        for (const data of oficinasfotos) {
            let img = data.image
            if(img){
                let splitimg = img.split('.')
                let nimg = splitimg[0]
                nimg = nimg+'.webp'
            
                //let filePath2 = 'uploads\\oficinas\\'+nimg
                  let filePath2 = 'uploads/oficinas/'+nimg   //! linux
                fs.unlink(filePath2, (err) => {/* console.log(err)*/})
            
               // let filePath = 'uploads\\oficinas\\'+img
                let filePath = 'uploads/oficinas/'+img  //! linux
                fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
        }
      }
     
    }else{
      status = 'error'
      message= result
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

  createFoto: async(req,res ) =>{
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);


    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdmCol(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    const id = req.body.id;
    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }
    
      
        let fileName = 'Imagen no subida';
      
      
     
        let oficina = await _model.getById(id);
        if(!oficina.id){
            return res.status(200).send({
                status: 'error',
                message: 'Registro no valido.',
                result:{}
            });
        }

       


        if(req?.files?.image){
          let filePath = req.files.image.path
          let fileSplit= filePath.split('/');
          fileName = fileSplit[2];
          let extSplit = fileName.split('\.')
          let fileExt = extSplit[1];
          fileExt = fileExt.toLowerCase();

          if(fileExt=='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif' || fileExt =='webp'){
            let result = await _model.createFoto({image:fileName, id_oficina:id})


            if(result=='success'){
              if(oficina.id){
                let img = oficina.image
                 if(img != undefined && img != ''){
                  let splitimg = img.split('.')
                  let nimg = splitimg[0]
                  nimg = nimg+'.webp'
  
                  //let filePath2 = 'uploads\\oficinas\\'+nimg
                     let filePath2 = 'uploads/oficinas/'+nimg   //! linux
                  fs.unlink(filePath2, (err) => {/* console.log(err)*/})
  
                  //let filePath = 'uploads\\oficinas\\'+oficina.image
                   let filePath = 'uploads/oficinas/'+img   //! linux
                  fs.unlink(filePath, (err) => {/* console.log(err)*/})
                 }
               }
            }else{
              let img = fileName
              let splitimg = img.split('.')
              let nimg = splitimg[0]
              nimg = nimg+'.webp'

                //let filePath2 = 'uploads\\oficinas\\'+nimg
                 let filePath2 = 'uploads/oficinas/'+nimg   //! linux
              fs.unlink(filePath2, (err) => {/* console.log(err)*/})

              //let filePath = 'uploads\\oficinas\\'+img
               let filePath = 'uploads/oficinas/'+img   //! linux
              fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
         
            return res.status(200).send({
              status: "success",
              message: "Imagen actualizada",
              file: req.files,
              result: result
            });
          }else{
            fs.unlink(filePath, (err) =>{
              return res.status(200).send({
                status: "error",
                message: "Extensión no valida"
              });
            })
          }
 
        }else{
          return res.status(200).send({
            status: "error",
            message: fileName
          });
        }
        

  },

  getImageFile: async function (req, res) {
    let image = req.params.image;

    let splitimg = image.split(".");
    let ext = splitimg[1];

    let path_image = "./uploads/oficinas/" + image;

    //metodo que busca la imagen
    const readFile = (path, opts = "utf8") =>
      new Promise((resolve, reject) => {
        try {
          fs.readFile(path, opts, (err, data) => {
            if (err) resolve({ error: err.message });
            else resolve(data);
          });
        } catch (err) {
          resolve({ error: err.message });
        }
      });

    //busqueda
    try {
      if (ext == "webp") {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        }

        //buscarla como jpg
        let imagejpg = `${splitimg[0]}.jpg`;
        let path_jpg = "./uploads/oficinas/" + imagejpg;

        const resultjpg = await readFile(path_jpg);

        if (!resultjpg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imagejpg}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPG
        let imageJPG = `${splitimg[0]}.JPG`;
        let path_JPG = "./uploads/oficinas/" + imageJPG;

        const resultJPG = await readFile(path_JPG);

        if (!resultJPG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imageJPG}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como png
        let imagepng = `${splitimg[0]}.png`;
        let path_png = "./uploads/oficinas/" + imagepng;

        const resultpng = await readFile(path_png);

        if (!resultpng.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imagepng}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como PNG
        let imagePNG = `${splitimg[0]}.PNG`;
        let path_PNG = "./uploads/oficinas/" + imagePNG;

        const resultPNG = await readFile(path_PNG);

        if (!resultPNG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imagePNG}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como jpeg
        let imagejpeg = `${splitimg[0]}.jpeg`;
        let path_jpeg = "./uploads/oficinas/" + imagejpeg;

        const resultjpeg = await readFile(path_jpeg);

        if (!resultjpeg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imagejpeg}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPEG
        let imageJPEG = `${splitimg[0]}.JPEG`;
        let path_JPEG = "./uploads/oficinas/" + imageJPEG;

        const resultJPEG = await readFile(path_JPEG);

        if (!resultJPEG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/oficinas/${imageJPEG}`,
            `./uploads/oficinas/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/oficinas/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        return res
          .status(200)
          .send({ message: "No existe la imagen", status: "error" });
      } else {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        } else {
          return res
            .status(200)
            .send({ message: "No existe la imagen", status: "error" });
        }
      }
    } catch (err) {
      return res
        .status(200)
        .send({ message: "No existe la imagen", status: "error" });
    }
  },

  deleteFoto: async  (req, res) => {
    const _repo = new oficinasRepo();
    const _model = new oficinasModel( _repo);
    const {id} = req.body;

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdmCol(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
      
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
       
      });
    }
   
   
    let validid = validate.validNum(id)
 
    if(!validid){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
       
      });
    }

    let item = await _model.getFotoById(id);
    if(!item.id){
      return res.status(200).send({
        status: 'error',
        message: 'Registro no valido',
      });
    }


    let result = await _model.deleteFoto(id);
    let message;
    let status ='success';
    
    if(result =='success'){
      message ='Foto eliminada'
    
      //! ELiminar imagen.
      let img = item.image
      if( img != '' && img != null && img != undefined){
        let splitimg = img.split('.')
        let nimg = splitimg[0]
        nimg = nimg+'.webp'
    
        let filePath2 = 'uploads\\colaborador\\'+nimg
        //  let filePath2 = 'uploads/colaborador/'+nimg   //! linux
        fs.unlink(filePath2, (err) => {/* console.log(err)*/})
    
        let filePath = 'uploads\\colaborador\\'+img
       // let filePath = 'uploads/colaborador/'+img  //! linux
        fs.unlink(filePath, (err) => {/* console.log(err)*/})
      }
   
     
    }else{
      status = 'error'
      message= result
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

 




};








module.exports = controller;
