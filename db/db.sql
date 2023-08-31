CREATE DATABASE soma_db_32fhd;

use soma_db_32fhd;

CREATE TABLE users(
id  int(11) auto_increment not null,
name varchar(100) not null,
lastname varchar(100) not null,
email varchar(150) not null,
pass varchar(300) not null,
phone varchar (30),
role varchar(50) not null DEFAULT 'user',
image varchar(255),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_user PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO users  (name, lastname, email, pass, phone, role, image) VALUES ('Erik', 'Gonzalez', 'erik@legrafica.mx', '$2b$10$JaIYejy6vdcRaP233dDNTuHdbpE/GOS0ywufXCyA0sCu3.sloBsN2', '6221270622', 'legrafica', 'sin imagen');

CREATE TABLE session (
id  int(11) auto_increment not null,
id_user int not null,
type varchar(30) not null,
code varchar(30) not null,
exp DATE,
created_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_session PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE profile(
id  int(11) auto_increment not null,
name varchar(150) not null,
code varchar(50) not null,
main varchar(50) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_profile PRIMARY KEY(id)
)ENGINE=InnoDb; 


INSERT INTO profile(name, code, main) VALUES('Color Resalte','#E21F1D','si');
INSERT INTO profile(name, code, main) VALUES('Color Principal','#242424','si');
INSERT INTO profile(name, code, main) VALUES('Links','#A7A7A7','si');
INSERT INTO profile(name, code, main) VALUES('Title','#8D8D8D','si');
INSERT INTO profile(name, code, main) VALUES('Body Text','#ffffff','si');
INSERT INTO profile(name, code, main) VALUES('Sidebar Text/Lines','#E5E5E5','si');
INSERT INTO profile(name, code, main) VALUES('Blanco','#ffffff','si');

CREATE TABLE personalize(
id  int(11) auto_increment not null,
logo varchar(150),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_personalize PRIMARY KEY(id)
)ENGINE=InnoDb; 
INSERT INTO personalize(logo) VALUES('logo.png');

CREATE TABLE colaborador(
id  int(11) auto_increment not null,

email varchar(150) not null,
pass varchar(300) not null,
name varchar(150) not null,
lastname varchar(150) not null,
phone varchar (30),
wlink varchar(500) not null,
role varchar(50) not null DEFAULT 'colaborador',
image varchar(255),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_colaborador PRIMARY KEY(id)
)ENGINE=InnoDb; 


  --PROPIEDADES

  --Terreno

CREATE TABLE terrenos(
id  int(11) auto_increment not null,
id_colaborador int not null,
titulo varchar(150) not null,
estatus varchar(10) not null DEFAULT 'ACTIVO',-- visible/oculto si se muestra o no en el sitio.

renta varchar(10) not null DEFAULT 'no', -- para el caso de que indique venta -> esta opcion indicara si se esta abierto a rentar.
tipo varchar(10) not null,

descripcion varchar(350),
ubicacion varchar(250),
precio decimal(15,2),
superficie varchar(50),
iframe varchar(500),
detalles varchar(1000),
etiquetas varchar(500),

created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_terrenos_colaborador FOREIGN KEY (id_colaborador)
        REFERENCES colaborador(id),
CONSTRAINT pk_terrenos PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE terrenos_fotos(
id  int(11) auto_increment not null,
id_terreno int not null,
portada varchar(500) DEFAULT 'no',
image varchar(550) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_tf_terrenos FOREIGN KEY (id_terreno)
        REFERENCES terrenos(id),
CONSTRAINT pk_terrenos_fotos PRIMARY KEY(id)
)ENGINE=InnoDb;




CREATE TABLE casas(
id  int(11) auto_increment not null,
id_colaborador int not null,
titulo varchar(150) not null,
estatus varchar(10) not null DEFAULT 'ACTIVO',-- visible/oculto si se muestra o no en el sitio.

renta varchar(10) not null DEFAULT 'no', -- para el caso de que indique venta -> esta opcion indicara si se esta abierto a rentar.
tipo varchar(10) not null,

cuartos decimal(15,2) DEFAULT 0,
banos decimal(15,2) DEFAULT 0 ,
cochera decimal(15,2) DEFAULT 0,
superficie_casa varchar(50),

descripcion varchar(350),
ubicacion varchar(250),
precio decimal(15,2),
superficie varchar(50),

iframe varchar(500),
detalles varchar(1000),
etiquetas varchar(500),

created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_casas_colaborador FOREIGN KEY (id_colaborador)
        REFERENCES colaborador(id),
CONSTRAINT pk_casas PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE casas_fotos(
id  int(11) auto_increment not null,
id_casa int not null,
portada varchar(500) DEFAULT 'no',
image varchar(550) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_cf_casas FOREIGN KEY (id_casa)
        REFERENCES casas(id),
CONSTRAINT pk_casas_fotos PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE oficinas(
id  int(11) auto_increment not null,
id_colaborador int not null,
titulo varchar(150) not null,
estatus varchar(10) not null DEFAULT 'ACTIVO',-- visible/oculto si se muestra o no en el sitio.

renta varchar(10) not null DEFAULT 'no', -- para el caso de que indique venta -> esta opcion indicara si se esta abierto a rentar.
tipo varchar(10) not null,

descripcion varchar(350),
ubicacion varchar(250),
precio decimal(15,2),
superficie varchar(50),

iframe varchar(500),
detalles varchar(1000),
etiquetas varchar(500),

created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_oficinas_colaborador FOREIGN KEY (id_colaborador)
        REFERENCES colaborador(id),
CONSTRAINT pk_oficinas PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE oficinas_fotos(
id  int(11) auto_increment not null,
id_oficina int not null,
portada varchar(500) DEFAULT 'no',
image varchar(550) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_of_oficinas FOREIGN KEY (id_oficina)
        REFERENCES oficinas(id),
CONSTRAINT pk_oficinas_fotos PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE locales(
id  int(11) auto_increment not null,
id_colaborador int not null,
titulo varchar(150) not null,
estatus varchar(10) not null DEFAULT 'ACTIVO',-- visible/oculto si se muestra o no en el sitio.

renta varchar(10) not null DEFAULT 'no', -- para el caso de que indique venta -> esta opcion indicara si se esta abierto a rentar.
tipo varchar(10) not null,

descripcion varchar(350),
ubicacion varchar(250),
precio decimal(15,2),
superficie varchar(50),

iframe varchar(500),
detalles varchar(1000),
etiquetas varchar(500),

created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_locales_colaborador FOREIGN KEY (id_colaborador)
        REFERENCES colaborador(id),
CONSTRAINT pk_locales PRIMARY KEY(id)
)ENGINE=InnoDb; 

CREATE TABLE locales_fotos(
id  int(11) auto_increment not null,
id_local int not null,
portada varchar(500) DEFAULT 'no',
image varchar(550) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT fk_of_locales FOREIGN KEY (id_local)
        REFERENCES locales(id),
CONSTRAINT pk_locales_fotos PRIMARY KEY(id)
)ENGINE=InnoDb;



CREATE TABLE suscripciones(
id  int(11) auto_increment not null,
email varchar(250) not null,
sub_date DATE,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_suscripciones PRIMARY KEY(id)
)ENGINE=InnoDb;