const Sequelize = require('sequelize');
const sequelize = new Sequelize('projeto', 'felipe', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conectado com o banco de dados')
}).catch(function(error){
    console.log('Error ao se conectar com o banco' + error)
})

module.exports = {
                  Sequelize: Sequelize,
                  sequelize : sequelize
                }