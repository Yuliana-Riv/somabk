"use strict";(self["webpackChunksoma_ft"]=self["webpackChunksoma_ft"]||[]).push([[456],{1830:function(t,s,i){i.r(s),i.d(s,{default:function(){return U}});var e=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"Dashboard"}},[s("SideMenu"),s("div",{staticClass:"content_sections"},[s("Sections",{attrs:{option:"Default"}})],1)],1)},a=[],o=function(){var t=this,s=t._self._c;return s("div",{staticClass:"dflx",attrs:{id:"SideMenu"}},[s("div",{staticClass:"box-1"},[s("div",{staticClass:"logo"},[t.statusimg?s("img",{attrs:{src:t.srcImg(t.logo.logo),alt:""}}):s("img",{attrs:{src:i(5884),alt:"logo aplicación"}})]),s("div",{staticClass:"msg-user"},[s("p",[t._v(" ¡HOLA, "),s("span",[t._v(t._s(t._f("splitUp")(t.identity.name))+"! ")])])]),s("div",{staticClass:"menu"},[s("ul",[s("li",{class:{active:"Dashboard"==t.navOption},on:{click:function(s){t.activeMenu(0),t.setOption("Mi Página")}}},[t._m(0),"Mi Página"==t.navOption?s("div",{staticClass:"icon-active"},[s("div",{staticClass:"ico"})]):t._e()]),s("li",{class:{active:"colaborador"==t.navOption},on:{click:function(s){t.activeMenu(0),t.setOption("colaborador"),t.setHistoryOptionClb("Default")}}},[t._m(1),"colaborador"==t.navOption?s("div",{staticClass:"icon-active"},[s("div",{staticClass:"ico"})]):t._e()]),s("li",{class:{active:"MenuP"==t.navOption},on:{click:function(s){t.activeMenu(2),t.setOption("MenuP")}}},[t._m(2),"MenuP"==t.navOption||t.hidemenu2?s("div",{staticClass:"icon-active-menu"},[s("div",{staticClass:"ico-2"})]):t._e()]),t.hidemenu2?s("li",{staticClass:"submenu",class:{active:"terrenos"==t.navOption},on:{click:function(s){t.setOption("terrenos"),t.setHistoryOptionTrr("Default")}}},[t._v(" ⦁ TERRENOS ")]):t._e(),t.hidemenu2?s("li",{staticClass:"submenu",class:{active:"casas"==t.navOption},on:{click:function(s){t.setOption("casas"),t.setHistoryOptionCss("Default")}}},[t._v(" ⦁ CASAS ")]):t._e(),t.hidemenu2?s("li",{staticClass:"submenu",class:{active:"oficinas"==t.navOption},on:{click:function(s){t.setOption("oficinas"),t.setHistoryOptionOfn("Default")}}},[t._v(" ⦁ OFICINAS ")]):t._e(),t.hidemenu2?s("li",{staticClass:"submenu",class:{active:"locales"==t.navOption},on:{click:function(s){t.setOption("locales"),t.setHistoryOptionLcl("Default")}}},[t._v(" ⦁ LOCALES ")]):t._e()])])]),t._m(3)])},n=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"text-menu"},[t._v("IR A "),s("span",[t._v(" SOMA")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"text-menu"},[t._v("MI"),s("span",[t._v(" PERFIL")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"text-menu"},[t._v("MENÚ "),s("span",[t._v(" PROPIEDADES")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"box-2"},[s("div",{staticClass:"triangulo"})])}],r=i(629),l=i(3631),d={name:"SideMenu",data(){return{navOption:"Default",hidemenu:!1,hidemenu2:!1,url:l.H,statusimg:!1}},async created(){await this.getIdentity(),await this.getAllInfoLgo("personalize");await this.status_img(this.logo.logo);let t=localStorage.getItem("nav");t&&(this.setHistoryOptionMain(t),this.navOption=t,"terrenos"!=t&&"casas"!=t&&"oficinas"!=t&&"locales"!=t||(this.hidemenu2=!0))},computed:{identity(){return this.$store.getters["admin/getIdentity"]},logo(){const t=this.$store.getters["logo/data"];return Array.isArray(t)&&t[0]?.logo?t[0]:{logo:""}}},methods:{...(0,r.nv)("main",["setHistoryOptionMain"]),...(0,r.nv)("logo",["getAllInfoLgo"]),...(0,r.nv)("usuarios",["setHistoryOptionUsr"]),...(0,r.nv)("usuarios",["getAllInfoUsr"]),...(0,r.nv)("profile",["setHistoryOptionPrf"]),...(0,r.nv)("profile",["getAllInfoPrf"]),...(0,r.nv)("colaborador",["setHistoryOptionClb"]),...(0,r.nv)("colaborador",["getAllInfoClb"]),...(0,r.nv)("terrenos",["setHistoryOptionTrr"]),...(0,r.nv)("terrenos",["getInfoByIdTrr"]),...(0,r.nv)("casas",["setHistoryOptionCss"]),...(0,r.nv)("casas",["getInfoByIdCss"]),...(0,r.nv)("oficinas",["setHistoryOptionOfn"]),...(0,r.nv)("oficinas",["getInfoByIdOfn"]),...(0,r.nv)("locales",["setHistoryOptionLcl"]),...(0,r.nv)("locales",["getInfoByIdLcl"]),activeMenu(t){1==t?this.hidemenu?this.hidemenu=!1:this.hidemenu=!0:2==t?this.hidemenu2?this.hidemenu2=!1:this.hidemenu2=!0:(this.hidemenu=!1,this.hidemenu2=!1)},getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},setOption:function(t){"MenuP"==t?this.navOption=t:"Mi Página"==t||(this.navOption=t,localStorage.setItem("nav",t),this.setHistoryOptionMain(t),"colaborador"==t?this.getInfoByIdClb({id:this.identity.sub,option:"colaborador"}):"terrenos"==t?this.getInfoByIdTrr({id:this.identity.sub,option:"terrenos/colaborador"}):"casas"==t?this.getInfoByIdCss({id:this.identity.sub,option:"casas/colaborador"}):"oficinas"==t?this.getInfoByIdOfn({id:this.identity.sub,option:"oficinas/colaborador"}):"locales"==t&&this.getInfoByIdLcl({id:this.identity.sub,option:"locales/colaborador"}))},status_img:async function(t){if(!t||""==t)return this.statusimg=!1,"";let s={option:"personalize",image:t},i="";try{i=await this.$store.dispatch("main/getStatusImage",s),i?.data?.status?i="":this.statusimg=!0}catch(e){console.log(e)}return i},srcImg:function(t){if(!t||""==t)return this.statusimg=!1,"";let s=`${l.H}personalize-img/${t}`;return s}},filters:{splitUp:t=>{if(!t)return"";t=t.toString();let s=t.toUpperCase().split(" ");return s[0].charAt(0)+s[0].substring(1)}}},c=d,u=i(1001),m=(0,u.Z)(c,o,n,!1,null,"308db939",null),p=m.exports,v=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"Sections"}},[s("HeaderSec"),"colaborador"==t.historyOption?s("div",[s("Colaboradores")],1):t._e(),"terrenos"==t.historyOption?s("div",[s("Terrenos")],1):t._e(),"casas"==t.historyOption?s("div",[s("Casas")],1):t._e(),"oficinas"==t.historyOption?s("div",[s("Oficinas")],1):t._e(),"locales"==t.historyOption?s("div",[s("Locales")],1):t._e(),"locales"==t.historyOption?s("div",[s("Locales")],1):t._e()],1)},h=[],g=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"HeaderSec"}},[s("div",{staticClass:"dflx"},[s("div",{staticClass:"titles"},["colaborador"==t.historyOption||"Default"==t.historyOption?s("div",["Default"==t.historyOptionClb?s("div",[s("h3",[t._v("MI PERFIL")]),s("p",[t._v("Actualizar información")])]):t._e(),"Add"==t.historyOptionClb?s("div",[s("h3",[t._v("COLABORADORES")]),s("p",[t._v("Agregar nuevo colaborador")])]):t._e(),"Edit"==t.historyOptionClb?s("div",[s("h3",[t._v("COLABORADORES")]),s("p",[t._v("Editar colaborador")])]):t._e()]):"terrenos"==t.historyOption?s("div",["Default"==t.historyOptionTrr?s("div",[s("h3",[t._v("TERRENOS")]),s("p",[t._v("Listado de terrenos")])]):t._e(),"Add"==t.historyOptionTrr?s("div",[s("h3",[t._v("TERRENOS")]),s("p",[t._v("Agregar nuevo terreno")])]):t._e(),"Edit"==t.historyOptionTrr?s("div",[s("h3",[t._v("TERRENOS")]),s("p",[t._v("Editar terreno")])]):t._e()]):"casas"==t.historyOption?s("div",["Default"==t.historyOptionCss?s("div",[s("h3",[t._v("CASAS")]),s("p",[t._v("Listado de casas")])]):t._e(),"Add"==t.historyOptionCss?s("div",[s("h3",[t._v("CASAS")]),s("p",[t._v("Agregar nuevo casa")])]):t._e(),"Edit"==t.historyOptionCss?s("div",[s("h3",[t._v("CASAS")]),s("p",[t._v("Editar casa")])]):t._e()]):"oficinas"==t.historyOption?s("div",["Default"==t.historyOptionOfn?s("div",[s("h3",[t._v("OFICINAS")]),s("p",[t._v("Listado de oficinas")])]):t._e(),"Add"==t.historyOptionOfn?s("div",[s("h3",[t._v("OFICINAS")]),s("p",[t._v("Agregar nuevo oficina")])]):t._e(),"Edit"==t.historyOptionOfn?s("div",[s("h3",[t._v("OFICINAS")]),s("p",[t._v("Editar oficina")])]):t._e()]):"locales"==t.historyOption?s("div",["Default"==t.historyOptionLcl?s("div",[s("h3",[t._v("LOCALES")]),s("p",[t._v("Listado de locales")])]):t._e(),"Add"==t.historyOptionLcl?s("div",[s("h3",[t._v("LOCALES")]),s("p",[t._v("Agregar nuevo local")])]):t._e(),"Edit"==t.historyOptionLcl?s("div",[s("h3",[t._v("LOCALES")]),s("p",[t._v("Editar local")])]):t._e()]):s("div",[s("h3",[t._v(t._s(t.historyOption))]),s("p",[t._v("Opción aun no disponible.")])])]),s("div",{staticClass:"user-dv dflx"},[s("div",[s("h4",[t._v(" "+t._s(t._f("splitUp")(t.identity.name))+" "+t._s(t._f("splitUp")(t.identity.lastname))+" ")]),s("button",{on:{click:function(s){return t.cerrarSesion()}}},[t._v("Cerrar Sesión")])]),"success"==t.statusicon?s("div",{staticClass:"icon-user"},[s("img",{attrs:{src:this.srcImg(t.icon),alt:"icono usuario"}})]):s("div",{staticClass:"icon-user"},[s("img",{attrs:{src:t.icondefault,alt:"icono usuario"}})])])]),s("hr",{staticClass:"hrhd"}),t.viewModal?s("div",{staticClass:"modal_view"},[s("div",{attrs:{id:"modal_logout"}},[t._m(0),s("div",{staticClass:"modal_log_btns dflx"},[s("p",{on:{click:function(s){return t.logout()}}},[t._v("Aceptar")]),s("p",{on:{click:function(s){return t.cancelar()}}},[t._v("Cancelar")])])])]):t._e()])},f=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"body"},[s("img",{attrs:{src:i(9355),alt:"icono alerta"}}),s("h3",[s("span",[t._v("Cerrar Sesión")])])])}],_=i(6896),C={name:"HeaderSecClb",data(){return{message:"",status:"",viewModal:!1,url:l.H,icondefault:_,statusimg:"success"}},async created(){await this.getIdentity();let t={id:this.identity.sub,option:"user"};this.getImage(t)},computed:{historyOption(){return this.$store.getters["main/getHistoryOption"]},icon(){return this.$store.getters["main/img"]},statusicon(){return this.$store.getters["main/statusimg"]},historyOptionUsr(){return this.$store.getters["usuarios/getHistoryOption"]},historyOptionPrf(){return this.$store.getters["profile/getHistoryOption"]},historyOptionClb(){return this.$store.getters["colaborador/getHistoryOption"]},historyOptionTrr(){return this.$store.getters["terrenos/getHistoryOption"]},historyOptionCss(){return this.$store.getters["casas/getHistoryOption"]},historyOptionOfn(){return this.$store.getters["oficinas/getHistoryOption"]},historyOptionLcl(){return this.$store.getters["locales/getHistoryOption"]},identity(){return this.$store.getters["admin/getIdentity"]}},methods:{...(0,r.nv)("main",["getImage"]),wait:function(){setTimeout((()=>this.$router.go()),200)},getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},cerrarSesion(){this.viewModal=!0},cancelar(){this.viewModal=!1},logout:async function(){await this.$store.dispatch("admin/logout");this.wait()},srcImg:function(t){let s=`${l.H}/user-img/${t}`;return this.status_img(t),s},status_img:async function(t){let s={option:"user",image:t},i="";try{i=await this.$store.dispatch("main/getStatusImage",s),"error"==i.data.status?this.statusimg="error":this.statusimg="success"}catch(e){this.statusimg="error"}}},filters:{split:t=>t?(t=t.toString(),t.charAt(0).toUpperCase()):"",splitUp:t=>{if(!t)return"";t=t.toString();let s=t.toLowerCase().split(" ");return s[0].charAt(0).toUpperCase()+s[0].substring(1)},splitName:t=>{if(!t)return"";t=t.toString();let s=t.toLowerCase().split(" "),i=s.length;return 1==i?s[0].charAt(0).toUpperCase()+s[0].substring(1):s[0].charAt(0).toUpperCase()+s[0].substring(1)+" "+s[1].charAt(0).toUpperCase()+s[1].substring(1)}}},y=C,O=(0,u.Z)(y,g,f,!1,null,"0d15b5f2",null),b=O.exports,I=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"EditClb"}},[s("div",{staticClass:"form-content"},[s("form",{on:{submit:function(s){return s.preventDefault(),t.submit(t.added.name,t.added.lastname,t.added.email,t.added.phone,t.pass,t.passc,t.added.wlink)}}},[s("div",{staticClass:"grup-form dflx"},[s("div",{staticClass:"boxform"},[s("label",{staticClass:"name",attrs:{for:"name"}},[t._v("Nombre ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.added.name,expression:"added.name"}],staticClass:"in1",attrs:{type:"text",id:"name",name:"name",pattern:"[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\\s]{2,254}",required:""},domProps:{value:t.added.name},on:{input:function(s){s.target.composing||t.$set(t.added,"name",s.target.value)}}})]),s("div",{staticClass:"boxform"},[s("label",{staticClass:"lastname",attrs:{for:"lastname"}},[t._v("Apellido/s")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.added.lastname,expression:"added.lastname"}],staticClass:"in1",attrs:{type:"text",id:"lastname",name:"lastname",pattern:"[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\\s]{2,254}",required:""},domProps:{value:t.added.lastname},on:{input:function(s){s.target.composing||t.$set(t.added,"lastname",s.target.value)}}})])]),s("div",{staticClass:"grup-form dflx"},[s("div",{staticClass:"boxform"},[s("label",{staticClass:"phone",attrs:{for:"phone"}},[t._v("Teléfono")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.added.phone,expression:"added.phone"}],staticClass:"in1",attrs:{type:"text",id:"phone",name:"phone",minlength:"10",maxlength:"10",size:"10",pattern:"\\d*",required:""},domProps:{value:t.added.phone},on:{input:function(s){s.target.composing||t.$set(t.added,"phone",s.target.value)}}})]),s("div",{staticClass:"boxform"},[s("label",{staticClass:"email",attrs:{for:"email"}},[t._v("E-mail")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.added.email,expression:"added.email"}],staticClass:"in1",attrs:{type:"email",id:"email",name:"email",required:""},domProps:{value:t.added.email},on:{input:function(s){s.target.composing||t.$set(t.added,"email",s.target.value)}}})])]),s("div",{staticClass:"grup-form dflx"},[s("div",{staticClass:"boxform"},[s("label",{staticClass:"wlink",attrs:{for:"wlink"}},[t._v("Whatsapp Link")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.added.wlink,expression:"added.wlink"}],attrs:{type:"text",id:"wlink",name:"wlink",required:""},domProps:{value:t.added.wlink},on:{input:function(s){s.target.composing||t.$set(t.added,"wlink",s.target.value)}}})])]),s("p",{staticClass:"chpass"},[t._v("*Solo si deseas cambiar la contraseña.")]),s("div",{staticClass:"grup-form dflx"},[s("div",{staticClass:"boxform"},[s("label",{staticClass:"pass",attrs:{for:"pass"}},[t._v("Contraseña")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],staticClass:"in5",attrs:{type:"password",id:"pass",name:"pass",minlength:"8"},domProps:{value:t.pass},on:{input:function(s){s.target.composing||(t.pass=s.target.value)}}})]),s("div",{staticClass:"boxform"},[s("label",{staticClass:"passc",attrs:{for:"passc"}},[t._v("Confirmar Contraseña")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.passc,expression:"passc"}],staticClass:"in5",attrs:{type:"password",id:"passc",name:"passc",minlength:"8"},domProps:{value:t.passc},on:{input:function(s){s.target.composing||(t.passc=s.target.value)}}})])]),t._m(0),""!=t.status?s("div",{staticClass:"status_messages"},["success"==t.status?s("div",{staticClass:"msg msg_success"},[s("p",[t._v(t._s(t.message))])]):t._e(),"error"==t.status?s("div",{staticClass:"msg msg_error"},[s("p",[t._v(t._s(t.message))])]):t._e()]):t._e()])]),s("hr",{staticClass:"hrhd"}),s("div",{staticClass:"form-img"},[s("div",{staticClass:"grup-form dflx"},[s("div",{staticClass:"boxform"},[s("label",[t._v("Imagen")]),s("div",{staticClass:"dflx"},[t._m(1),s("label",{staticClass:"filelabelname tbl_item",attrs:{for:"uploadimg"}},[t._v(" "+t._s(t.archivo))])]),s("input",{staticClass:"fileinput",attrs:{type:"file",id:"uploadimg",name:"uploadimg",required:""},on:{change:t.previewFiles}})])]),s("div",{staticClass:"dflx"},[s("div",{staticClass:"btn_añadir2 dflx",on:{click:function(s){return t.submitImg(t.file1)}}},[t._m(2),s("img",{attrs:{src:i(4696),alt:""}})])]),""!=t.status2?s("div",{staticClass:"status_messages"},["success"==t.status2?s("div",{staticClass:"msg msg_success"},[s("p",[t._v(t._s(t.message2))])]):t._e(),"error"==t.status2?s("div",{staticClass:"msg msg_error"},[s("p",[t._v(t._s(t.message2))])]):t._e()]):t._e()]),s("div",{staticClass:"div-user"},[t.statusimg?s("img",{staticClass:"logo",attrs:{src:t.srcImg(t.added.image),alt:""}}):t._e()]),t.viewModal?s("div",{staticClass:"modal_view"},[s("div",{attrs:{id:"modal_edit"}},[t._m(3),s("div",{staticClass:"modal_edit_btns dflx"},[s("p",{staticClass:"otro",on:{click:function(s){return t.wait()}}},[t._v("Aceptar")])])])]):t._e()])},A=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"dflx"},[s("button",{staticClass:"alta",attrs:{type:"submit"}},[t._v("Editar")])])},function(){var t=this,s=t._self._c;return s("label",{staticClass:"filelabel",attrs:{for:"uploadimg"}},[s("span",[t._v("Seleccionar Archivo")])])},function(){var t=this,s=t._self._c;return s("p",[t._v("AGREGAR "),s("span",[t._v(" IMAGEN")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"body dflx"},[s("h3",[t._v("Colaborador actualizado")]),s("img",{attrs:{src:i(40),alt:"icono alerta"}})])}],w={name:"EditClb",data(){return{status:"",message:"",status2:"",message2:"",active:!1,pass:"",passc:"",archivo:"No se eligió archivo",statusimg:!1,file1:null,viewModal:!1}},async created(){await this.getIdentity();const t=await this.getInfoByIdClb({id:this.identity.sub,option:"colaborador"});console.log(t),this.setAddedClb(t);await this.status_img(this.added.image)},computed:{added(){return this.$store.getters["colaborador/getAdded"]},data(){return this.$store.getters["colaborador/data"]},identity(){return this.$store.getters["admin/getIdentity"]}},methods:{...(0,r.nv)("colaborador",["setAddedClb"]),...(0,r.nv)("colaborador",["setHistoryOptionClb"]),wait:function(){setTimeout((()=>this.$router.go()),200)},getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},...(0,r.nv)("colaborador",["getInfoByIdClb"]),submit:async function(t,s,i,e,a,o,n){if(this.status="",this.message="",a===o){let r=await this.$store.dispatch("colaborador/editItemClb",{option:"colaborador",item:{id:this.added.id,name:t,lastname:s,email:i,phone:e,pass:a,passc:o,wlink:n}});"error"==r.status?(this.status="error",this.message=r.message):this.showModal()}else this.status="error",this.message="Las contraseñas no coinciden."},closeSelect(){this.active=!1,document.getElementById("select-ch").checked=!1},submitImg:async function(t){if(this.status="",this.msg="",null!=t)if(t.size>5e6)this.status2="error",this.message2="La imagen excede el tamaño maximo permitido de 1MB.",this.delStatus();else{var s=new FormData;s.append("image",t),s.append("_method","PUT");let i=await this.$store.dispatch("main/editImage",{id:this.added.id,item:s,option:"colaborador"});"error"==i.status?(this.status2="error",this.message2=i.message,this.delStatus()):this.showModal()}else this.status2="error",this.message2="Imagen no subida.",this.delStatus()},delStatus:function(){setTimeout((()=>this.delMsgs()),2e3)},delMsgs:function(){this.status="",this.message="",this.status2="",this.message2=""},showModal:function(){this.viewModal=!0},closeModal:function(){this.viewModal=!1,this.setAddedClb(""),this.setHistoryOptionClb("Default")},Edit:function(){this.viewModal=!1},back:function(){setTimeout((()=>this.$router.go()),200)},previewFiles(t){var s=t.target.files||t.dataTransfer.files;s.length&&(this.file1=s[0],this.archivo=this.file1.name)},srcImg:function(t){if(console.log(t),!t||""==t)return this.statusimg=!1,"";let s=`${l.H}/colaborador-img/${t}`;return s},status_img:async function(t){if(!t||""==t)return this.statusimg=!1,"";this.statusimg=!1;let s={option:"colaborador",image:t},i="";try{i=await this.$store.dispatch("main/getStatusImage",s),i?.data?.status?i="":this.statusimg=!0}catch(e){}return i}}},S=w,x=(0,u.Z)(S,I,A,!1,null,"a75de8ca",null),M=x.exports,$=i(148),H=i(3478),E=i(2822),L=i(3969),k={name:"Sections",components:{HeaderSec:b,Colaboradores:M,Terrenos:$.Z,Casas:H.Z,Oficinas:E.Z,Locales:L.Z},data(){return{search_value:"",status:"",message:"",option:"Default"}},computed:{historyOption(){return this.$store.getters["main/getHistoryOption"]}},created(){let t=localStorage.getItem("nav");void 0!=t&&null!=t&&""!=t&&(this.option=t,this.setHistoryOptionMain(t))},methods:{...(0,r.nv)("main",["setHistoryOptionMain"]),...(0,r.nv)("main",["getHistoryOption"])}},D=k,P=(0,u.Z)(D,v,h,!1,null,"fafced36",null),T=P.exports,N={name:"dashcolab",components:{SideMenu:p,Sections:T}},R=N,B=(0,u.Z)(R,e,a,!1,null,"23f57190",null),U=B.exports}}]);
//# sourceMappingURL=456.c20d648a.js.map