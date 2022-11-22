import express from "express";
import session from "express-session";
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

rout.get("/Registrarse_Admin", (req,res)=>{
    res.sendFile("/public/Registro_Empleado.html", {root:"."})
})

rout.post("/Registrarse_Admin",(req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    db.query(`select idAdministrador from Administrador;`, (error,results)=>{
        if(error){
            console.log(error);
            res.redirect("/SignEmp");
        }else{
            id = Math.floor(Math.random()*1000000);
            var existingId = true;
            while(existingId){
                existingId = false;
                results.forEach((row)=>{
                    if(row.idAdministrador == id){
                        existingId = true;
                        id = Math.floor(Math.random()*1000000);
                    }
                })
            }
        }
    });
    var setString = `insert into Administrador (idAdministrador, Apellido_Paterno, Apellido_Materno, Nombre, Contraseña) values (${id},"${req.body.AP}","${req.body.AM}","${req.body.Name}","${req.body.PW}")`;
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.render("../public/registro_Exitoso",{id:id})
});

rout.get("/logAdmin", (req,res)=>{
    res.sendFile("/public/Login_Administrador.html",{root:"."})
});

rout.post("/logAdmin",(req,res, next)=>{
    db.query(`select * from administrador where nombre = "${req.body.user}" ;`,(error,results)=>{
        console.log("a");
        if (error){
            res.redirect("/logAdmin");
            console.log(error);
        }else{
            results.forEach((row)=>{
                if(req.body.Password == row.Contraseña){
                    sesion = req.session;
                    sesion.userid = req.body.user;
                    res.redirect("/stock");
                    return next();
                }
                res.redirect("/stock");
                next();
            });
        }
    });
});

rout.get("/Registrar_Empleado", (req,res)=>{
    res.sendFile("/public/Registro_Empleado.html",{root:"."});
});

rout.post("/Registrar_Empleado", (req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    //var idAdmin = db.query(`select idAdministrador from Administrador WHERE nombre = ${sesion.userid}`)
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
    var setString = `insert into Empleado (idEmpleado, Apellido_Paterno, Apellido_Materno, Nombre, Contraseña, Administrador_idAdministrador) values (${id},"${req.body.AP}","${req.body.AM}","${req.body.Name}","${req.body.PW}", 878652)`;
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.render("../public/registro_Exitoso",{id:id})
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


rout.get("/SignSucced", (req,res)=>{
    res.sendFile("/public/registro_Exitoso.html",{root:"."})
});



rout.post("/logEmpleado",function(req,res){
    db.query(`select * from empleado where idEmpleado = ${req.body.id} ;`,(error,results)=>{
        if (error){
            res.render("Login_Empleado",{text:"Error inesperado, vuelva a intentarlo más tarde."});
            console.log(error);
        }else if(results.length === 0){
            res.render("Login_Empleado",{text:"ID no registrado."});
        }else{
            results.forEach((row)=>{
                if(req.body.password == row.Contraseña){
                    sesion = req.session;
                    sesion.userid = req.body.id;
                    sesion.password = req.body.password;
                    sesion.AP = row.Apellido_Paterno;
                    sesion.AM = row.Apellido_Materno;
                    sesion.name = row.Nombre;
                    sesion.idAdmin = row.Administrador_idAdministrador;
                    res.redirect("/stock");
                }else{
                    res.render("Login_Empleado",{text:"ID y contraseña no coinciden."});
                }
            })
        }
    });
});


rout.get("/logOut",(req,res)=>{
    sesion = req.session.destroy();
    res.redirect("/");
})

rout.get("/stock", (req,res)=>{
    if(sesion){
        var data;
        db.query(`select * from producto where Administrador_idAdministrador = ${sesion.idAdmin} ;`,(error, results)=>{
            if(error){
                console.log(error);
            }else if (results){
               data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:results};
               console.log("a")
               res.render("./inventario", data);
            }else{
               data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:null}
               console.log("b")
               res.render("./inventario", data);
            }
        })
    }else{
        res.redirect("/logEmp");
    }
})

rout.get("/addProduct",(req,res)=>{
    res.sendFile("/public/Agregar_Producto.html", {root:"."});
});

rout.post("/addProduct",(req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    var setString = `insert into Producto (idProducto, Nombre, Precio, Descripcion, Imagen, Administrador_idAdministrador, Marca_idMarca, Existencias) values (${id},"${req.body.nombreP}",${req.body.PrecioP},"${req.body.DesPro}","${req.body.ImaP}",1, 4, ${req.body.ExisP});`
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.redirect("/stock")
});

rout.get("/modifyProduct",(req,res)=>{

});

rout.get("/deleteProduct",(req,res)=>{

});



export const Rout = rout;