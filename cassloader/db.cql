CREATE KEYSPACE IF NOT EXISTS analyzer WITH replication = {'class': 'SimpleStrategy', 'replication_factor':1};
-- CREATE KEYSPACE analyzer WITH replication = {'class': 'NetworkTopologyStrategy', 'DLRMAXCOM': '3'}  AND durable_writes = true;

CREATE TABLE analyzer.projects (
    project_id timeuuid,
    project_name varchar,
    config varchar,
    description varchar,
    marcas varchar,
    categoria varchar,
    PRIMARY KEY (project_id)
);

INSERT INTO analyzer.projects (project_id, project_name, description ) VALUES (abf9e83c-8c34-11e8-8353-d1580c01fad8,'Proyecto A', 'y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando e' );
INSERT INTO analyzer.projects (project_id, project_name, description ) VALUES (abf9e83d-8c34-11e8-a267-75ea15cd3950,'Proyecto B', 'y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando e' );
INSERT INTO analyzer.projects (project_id, project_name, description ) VALUES (abf9e83e-8c34-11e8-ae0c-b204d09f5794,'Proyecto C', 'y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando e' );
INSERT INTO analyzer.projects (project_id, project_name, description ) VALUES (abfa0f40-8c34-11e8-9ee9-b98b8ae99b7e,'Proyecto D', 'y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando e' );


CREATE TABLE analyzer.user_projects (
    user_id text,
    project_id timeuuid,
    PRIMARY KEY (user_id, project_id)
);

INSERT INTO analyzer.user_projects (user_id, project_id) VALUES ('CUwNdYcUcPUQwsqo29CHhDMfRA13', abf9e83c-8c34-11e8-8353-d1580c01fad8);
INSERT INTO analyzer.user_projects (user_id, project_id) VALUES ('CUwNdYcUcPUQwsqo29CHhDMfRA13', abf9e83d-8c34-11e8-a267-75ea15cd3950);
INSERT INTO analyzer.user_projects (user_id, project_id) VALUES ('CUwNdYcUcPUQwsqo29CHhDMfRA13', abf9e83e-8c34-11e8-ae0c-b204d09f5794);
INSERT INTO analyzer.user_projects (user_id, project_id) VALUES ('LcAilaVf51Nt76Ry2wdLM2DWdX73', abfa0f40-8c34-11e8-9ee9-b98b8ae99b7e);


CREATE TABLE analyzer.project_to_estimulo (
    project_id timeuuid,
    estimulo_id timeuuid,
    url text,
    numInfo int,
    PRIMARY KEY ( project_id, estimulo_id)
);

CREATE TABLE analyzer.estimulo (
    estimulo_id timeuuid,
    url text,
    data varchar,
    estimulo_name varchar,
    numInfo int,
    numTota int,
    stack_reactions varchar,
    instructions varchar,
    PRIMARY KEY (estimulo_id)
);

CREATE TABLE analyzer.users (
    user_id text,
    mail text,
    config text,
    PRIMARY KEY (user_id)
);

CREATE TABLE analyzer.informante (
    estimulo_id timeuuid,
    infor_id varchar,
    answers text,
    start_answer TIMESTAMP,
    finish_answer TIMESTAMP,
    PRIMARY KEY (estimulo_id,infor_id)
);

create table analyzer.reactions (
reaction_id timeuuid,
reaction varchar,
name varchar,
tipo varchar,
PRIMARY key (reaction_id)
);


INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda956e0-abd2-11e8-a280-5b30023e4373,'👍', 'Me gusta', 'emoji');
INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda92fd1-abd2-11e8-8627-803ee02ad595,'😍', 'Me encanta', 'emoji');
INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda8e1b0-abd2-11e8-9fe7-d00876816104,'😆', 'Me divierte', 'emoji');
INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda908c2-abd2-11e8-9c1e-79ed5884cd81,'🙁', 'Me entristece', 'emoji');
INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda908c6-abd2-11e8-ab02-fba9b851f22a,'😡', 'Me enoja', 'emoji');
INSERT INTO analyzer.reactions (reaction_id, reaction,name,tipo ) 
    VALUES (eda908c6-abd2-11e8-9b02-fba9b851f22a,'', 'sin emoji', 'emoji');

create table analyzer.categorys (
categorys_name text,
projects set<TIMEUUID>,
PRIMARY key (categorys_name)
);
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('hogar');
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('calzado');
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('bebidas');
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('noticias');
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('tecnologia');
INSERT INTO analyzer.categorys (categorys_name ) 
    VALUES ('transporte');

create table analyzer.marcas (
marcas_name text,
projects set<TIMEUUID>,
PRIMARY key (marcas_name)
);

create table analyzer.etiquetas (
etiquetas_name text,
projects set<TIMEUUID>,
PRIMARY key (etiquetas_name)
);

