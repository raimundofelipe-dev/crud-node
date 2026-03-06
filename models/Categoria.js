const { type } = require('os')
const db = require('./db')

const Categoria = db.sequelize.define('categoria', {
    nome: {
        type: db.Sequelize.STRING,
         allowNull: false
    },
    slug: {
        type: db.Sequelize.STRING,
         allowNull: false
    },
    date: {
        type: db.Sequelize.DATE,
        allowNull: false
    }
})

//Categoria.sync({force: false})

module.exports = Categoria;