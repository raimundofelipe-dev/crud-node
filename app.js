    // IMPORTAÇÃO DOS MÓDULOS
const express = require('express');
const app = express();

const { engine } = require('express-handlebars');

const path = require('path');

const admin = require('./routes/admin');

const session = require('express-session')
const flash = require('connect-flash')

    // CONFIGURAÇÕES
// CONFIG session
app.use(session({
    secret:  "segredo",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// CONFIG MIDDLEWARE
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// CONFIG 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONFIG DO HANDLEBARS
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// CONFIG DE ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, "public")));


    // ROTAS
app.use('/admin', admin);

    // INICIALIZAÇÃO DO SERVIDOR
const PORT = 3000;

app.listen(PORT, function(){
    console.log('Servidor rodando na porta localhost:3000');
});