import express from "express";
const {pathname: root} = new URL('..', import.meta.url)
import {db} from "./db.js"

let sesion;

const rout = express.Router();

rout.get("/", (req,res)=>{
    sesion = req.session;
    res.sendFile("/public/index.html",{root:"."})
});

rout.get("/aboutUs", (req,res)=>{
    res.sendFile("/public/SobreNosotros.html",{root:"."})
});

rout.get("/contactUs", (req,res)=>{
    res.sendFile("/public/Contactanos.html",{root:"."})
});

rout.get("/profile", (req,res)=>{
    sesion = req.session;
    console.log(req.session.userid);
    if(req.session.userid){
        res.send("Necesito el html del perfil<a href=/logOut>Cerrar sesión</a>");
    }else{
        res.redirect("/logEmp");
    }
});

rout.get("/logEmp", (req,res)=>{
    res.sendFile("/public/Login_Empleado.html",{root:"."})
});

rout.get("/logAdmin", (req,res)=>{
    res.sendFile("/public/Login_Administrador.html",{root:"."})
});

rout.get("/SignSucced", (req,res)=>{
    res.sendFile("/public/registro_Exitoso.html",{root:"."})
});

rout.get("/SignAdmin", (req,res)=>{
    res.send("Necesito los html");
});

rout.post("/logEmpleado",function(req,res,next){
    db.query(`select * from empleado where nombre = "${req.body.user}" ;`,(error,results)=>{
        if (error){
            res.redirect("/logEmp");
        }else if(results.length === 0){
            res.redirect("/logEmp");
        }else{
            results.forEach((row)=>{
                if(req.body.password == row.Contraseña){
                    sesion = req.session;
                    sesion.userid = req.body.user;
                    res.redirect("/")
                    return next();
                }
                res.redirect("/logEmp");
                next();
            })
        }
    });
});

rout.post("/logAdministrador",(req,res, next)=>{
    db.query(`select * from administrador where nombre = "${req.body.user}" ;`,(error,results)=>{
        console.log(results)
        if (error){
            console.log(error);
            res.redirect("/logAdmin");
        }else{
            console.log(req.body.password)
            results.forEach((row)=>{
                console.log(row);
                if(req.body.password == row.Contraseña){
                    sesion = req.session;
                    sesion.userid = req.body.user;
                    res.redirect("/");
                    return next();
                }
                res.redirect("/logAdmin");
                next();
            });
        }
    });
});

rout.get("/logOut",(req,res)=>{
    console.log(req.session);
    sesion = req.session.destroy();
    console.log(req.session);
    res.redirect("/");
})

rout.get("/addProduct",(req,res)=>{
    
});

rout.get("/modifyProduct",(req,res)=>{

});

rout.get("/deleteProduct",(req,res)=>{

});



export const Rout = rout;
