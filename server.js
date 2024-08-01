const express = require("express");
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const router = require("./router/route")
require('dotenv').config();
const cookie = require("cookie-parser")
const app = express()


app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(cookie())
mongoose.connect(process.env.CONECTION_STRING).then(() => console.log('db connected'));

app.use(router)

const PORT =  2004
app.listen(PORT,()=>{console.log(`server is runnig ${PORT}`)})