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

rout.get("/SignEmp", (req,res)=>{
    res.sendFile("/public/Registro_Empleado.html",{root:"."});
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
                    res.redirect("/stock");
                    return next();
                }
                res.redirect("/logEmp");
                next();
            })
        }
    });
});

rout.post("/signEmpleado", (req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    db.query(`select idEmpleado from Empleado;`, (error,results)=>{
        if(error){
            console.log(error);
            res.redirect("/SignEmp");
        }else{
            id = Math.floor(Math.random()*1000000);
            var existingId = true;
            while(existingId){
                existingId = false;
                results.forEach((row)=>{
                    if(row.idEmpleado == id){
                        existingId = true;
                        id = Math.floor(Math.random()*1000000);
                    }
                })
            }
        }
    });
    var setString = `insert into Empleado (idEmpleado, Nombre, Contraseña, email, Administrador_idAdministrador) values (${id},"${req.body.name}","${req.body.PW}","carloscw0304", 1)`;
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.render("../public/registro_Exitoso",{id:id})
});

rout.post("/logAdministrador",(req,res, next)=>{
    db.query(`select * from administrador where nombre = "${req.body.user}" ;`,(error,results)=>{
        console.log("a");
        if (error){
            res.redirect("/logAdmin");
        }else{
            results.forEach((row)=>{
                if(req.body.password == row.Contraseña){
                    sesion = req.session;
                    sesion.userid = req.body.user;
                    res.redirect("/stock");
                    return next();
                }
                res.redirect("/logAdmin");
                next();
            });
        }
    });
});

rout.get("/logOut",(req,res)=>{
    sesion = req.session.destroy();
    res.redirect("/");
})

rout.get("/stock", (req,res)=>{
    res.sendFile("/public/inventario.html", {root:"."});
})

rout.get("/addProduct",(req,res)=>{
    
});

rout.get("/modifyProduct",(req,res)=>{

});

rout.get("/deleteProduct",(req,res)=>{

});



export const Rout = rout;
