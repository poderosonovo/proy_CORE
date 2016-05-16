
var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Importar la definición de la tabla de user.js
var User= sequelize.import(path.join(__dirname, 'user'));

// Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey:'AuthorId'}); //cambiamos User por Author


/*
// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync()
    .then(function() {
        // Ya se han creado las tablas necesarias.
        return Quiz.count()
                .then(function (c) {
                    if (c === 0) {   // la tabla se inicializa solo si está vacía
                        return Quiz.bulkCreate([ {question: 'Capital de Italia',   answer: 'Roma'},
                                                 {question: 'Capital de Portugal', answer: 'Lisboa'},
                                                 {question: 'Capital de España',   answer: 'Madrid'}
                                              ])
                                   .then(function() {
                                        console.log('Base de datos inicializada con datos');
                                    });
                    }
                });
    })
    .catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });*/
exports.User=User; //exportar definición de tabla Users
exports.Comment=Comment; //exportar definición de la tabla Comment
exports.Quiz = Quiz; // exportar definición de tabla Quiz
