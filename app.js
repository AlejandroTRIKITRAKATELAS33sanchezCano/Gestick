import express from "express";
import http from "http";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import {port} from "./src/deployConfig.js";
import {Rout} from "./src/router.js";

const app = express();
app.set("view engine", "ejs");
app.use(session({
    secret: "thisismykey",
    saveUninitialized:true,
    resave:false
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/", Rout);

const Server = http.Server(app);

Server.listen(port, () =>{
    console.log(`Escuchando en el puerto ${port}`);
})

