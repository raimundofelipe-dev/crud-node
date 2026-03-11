const express = require("express");
const router = express.Router();

const Categoria = require("../models/Categoria");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categorias", (req, res) => {

  Categoria.findAll({
    order: [['date', 'DESC']],
    raw: true
  }).then((categorias) => {
    res.render("admin/categorias", { categorias: categorias });
  }).catch((error) => {
    req.flash("error_msg", "Houve um erro ao listar a categoria")
    res.redirect("/admin")
  })
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  var erros = [];

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: "Nome inválido" });
  }
  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    erros.push({ texto: "Slug inválido" });
  }
  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros: erros });
  } else {
    Categoria.create({
      nome: req.body.nome,
      slug: req.body.slug,
      date: new Date(),
    }).then(function () {
      req.flash("success_msg", "Categoria criada com sucesso")
      res.redirect("/admin/categorias");
    }).catch(function (error) {
      req.flash("error_msg", "Erro ao criar a categoria")
      res.redirect("/admin");
    });
  }
});


router.get("/categorias/edit/:id", (req, res) => {

  Categoria.findOne({
    where: { id: req.params.id },
    raw: true
  }).then((categoria) => {
    res.render('admin/editcategorias', { categoria: categoria })
  }).catch((error) => {
    req.flash("error_msg", "Esta categoria não existe")
    res.redirect("/admin/categorias")
  })
})

router.post("/categorias/edit", (req, res) => {

  Categoria.update(
    {
      nome: req.body.nome,
      slug: req.body.slug
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => {
    req.flash("success_msg", "Categoria editada com sucesso")
    res.redirect("/admin/categorias")
  }).catch((erro) => {
    req.flash("error_msg", "Error ao editar categoria")
    res.redirect("/admin/categorias")
  })
})

router.post('/categorias/deletar', (req, res) => {

  Categoria.destroy({
    where: { id: req.body.id }
  }).then(() => {
    req.flash("success_msg", "Categoria deletada com sucesso")
    res.redirect("/admin/categorias")
  }).catch((erro) => {
    req.flash("error_msg", "Erro ao deletar categoria")
    res.redirect("/admin/categorias")
  })
})

module.exports = router;