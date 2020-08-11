const express = require('express')
const nunjucks = require('nunjucks')
const clientes = require("./costumers.json")
const server = express()

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/cliente", function(req, res) {
    const id = req.query._id;
    const cliente = clientes.find((clnt) => {
        if (clnt._id == id) {
            return clnt
        }
    })
    return res.render("cliente", {item: cliente})
})

server.get("/", function(req, res) {
    return res.render("dashboard", {items: clientes})
})

server.get("/dashboard_asc", function(req, res) {
    const clientesAsc = [...clientes]
    clientesAsc.sort(function(a,b) {
        return a.name.first < b.name.first ? -1 : a.name.first > b.name.first ? 1 : 0
    })
    return res.render("dashboard_asc", {items: clientesAsc})
})

server.get("/dashboard_desc", function(req, res) {
    const clientesDesc = [...clientes]
    clientesDesc.sort(function(a,b) {
        return a.name.first > b.name.first ? -1 : a.name.first < b.name.first ? 1 : 0
    })
    return res.render("dashboard_desc", {items: clientesDesc})
})

server.get("/dashboard_menor", function(req, res) {
    const clientesMenor = [...clientes]
    clientesMenor.sort(function(a,b) {
        return a.budget < b.budget ? -1 : a.budget > b.budget ? 1 : 0
    })
    return res.render("dashboard_menor", {items: clientesMenor})
})

server.get("/dashboard_maior", function(req, res) {
    const clientesMaior = [...clientes]
    clientesMaior.sort(function(a,b) {
        return a.budget > b.budget ? -1 : a.budget < b.budget ? 1 : 0
    })
    return res.render("dashboard_maior", {items: clientesMaior})
})

server.listen(5000, function() {
    console.log("server is running")
})