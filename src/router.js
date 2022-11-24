import express from "express";
import session from "express-session";
const {pathname: root} = new URL('..', import.meta.url)
import {db} from "./db.js";
import multer from "multer";
import { diffieHellman } from "crypto";

import path from 'path';
import mimeTypes from 'mime-types';
import { url } from "inspector";

let hola = "no";
let urlIma = Date.now();

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function(req,file,cb){
        cb("",file.originalname+ "." + mimeTypes.extension(file.mimetype));
    }
});

const upload = multer({
    storage:storage
});

let sesion;

const rout = express.Router();

rout.get("/", (req,res)=>{
    sesion = req.session;
    hola = "si";
    res.sendFile("/public/index.html",{root:"."})
});

rout.get("/aboutUs", (req,res)=>{
    console.log(hola);
    res.sendFile("/public/SobreNosotros.html",{root:"."})
});

rout.get("/contactUs", (req,res)=>{
    res.sendFile("/public/Contactanos.html",{root:"."})
});

rout.get("/signAdmin", (req,res)=>{
    res.sendFile("/public/Registro_Administrador.html", {root:"."})
})

rout.post("/signAdministrador",(req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    db.query(`select idAdministrador from Administrador;`, (error,results)=>{
        if(error){
            console.log(error);
            res.redirect("/signEmp");
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
    var setString = `insert into Administrador (idAdministrador, AApellido_Paterno, AApellido_Materno, ANombre, AContraseña) values (${id},"${req.body.AP}","${req.body.AM}","${req.body.Name}","${req.body.PW}")`;
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.render("../public/registro_Exitoso",{id:id})
});

rout.get("/logAdmin", (req,res)=>{
    if (sesion){
        res.render("Login_Administrador",{text: sesion.txterr})
        sesion.txterr = "";
        req.session = null;
        sesion = req.session;
    }else{
        res.render("Login_Administrador",{text: ""})
    }
});

rout.post("/logAdministrador",(req,res, next)=>{
    db.query(`select * from administrador where idAdministrador = "${req.body.id}" ;`,(error,results)=>{
        if (error){
            sesion = req.session;
            sesion.txterr = "Error en el servidor. Vuelva a intentar más tarde";
            res.redirect("/logAdmin");
            console.log(error);
        }else if(results.length === 0){
            sesion = req.session;
            sesion.txterr = "ID no registrado";
            res.redirect("/logAdmin");
        }else{
            sesion = req.session;
            results.forEach((row)=>{
                if(req.body.password == row.AContraseña){
                    sesion = req.session;
                    sesion.userid = req.body.id;
                    sesion.PW = req.body.password;
                    sesion.AP = row.AApellido_Paterno;
                    sesion.AM = row.AApellido_Materno;
                    sesion.name = row.ANombre;
                    sesion.type = "a";
                    res.redirect("/stock");
                }else{
                    sesion.txterr = "ID y contraseña no coinciden";
                    res.redirect("/logAdmin");
                }
            });
        }
    });
});

rout.get("/stock", (req,res)=>{
    if(sesion){
        if(sesion.type === "a"){
            var data;
            db.query(`SELECT * from Producto a INNER JOIN Marca b on a.Marca_idMarca = b.idMarca where Administrador_idAdministrador = ${sesion.userid} ;`,(error, results)=>{
                if(error){
                    console.log(error);
                }else if (results){
                    data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid,Contraseña: sesion.PW, table:results};
                    res.render("./inventario", data);
                }else{
                    data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, Contraseña: sesion.PW ,table:null}
                    res.render("./inventario", data);
                }
            })
        }else if(sesion.type === "e"){
            var data;
            db.query(`SELECT * from Producto a INNER JOIN Marca b on a.Marca_idMarca = b.idMarca where Administrador_idAdministrador = ${sesion.idAdmin} ;`,(error, results)=>{
                if(error){
                    console.log(error);
                }else if (results){
                    data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid,Contraseña: sesion.PW, table:results};
                    console.log("a");
                    console.log(data)
                    res.render("./Productos_Index", data);
                }else{
                    data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, Contraseña: sesion.PW ,table:null}
                    console.log("b")
                    res.render("./Productos_Index", data);
                }
            })
        }
    }else{
        res.redirect("/logEmp");
    }
})

rout.get("/Consulta-Empleados", (req,res)=>{
    if(sesion){
        var data;
        db.query(`SELECT * from Empleado a INNER JOIN Administrador b on a.Administrador_idAdministrador = b.idAdministrador where Administrador_idAdministrador = ${sesion.userid} ;`,(error, results)=>{
            if(error){
                console.log(error);
            }else if (results){
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:results};
                console.log("a");
                res.render("./Empleados", data);
            }else{
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:null}
                console.log("b")
                res.render("./Empleados", data);
            }
        })
    }else{
        res.redirect("/logEmp");
    }
})

rout.get("/Registrar_Empleado", (req,res)=>{
    if(sesion){
        var data;
        db.query(`SELECT * from Empleado a INNER JOIN Administrador b on a.Administrador_idAdministrador = b.idAdministrador where Administrador_idAdministrador = ${sesion.userid} ;`,(error, results)=>{
            if(error){
                console.log(error);
            }else if (results){
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:results};
                console.log("a");
                res.sendFile("/public/Registro_Empleado.html",{root:"."});
            }else{
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, table:null}
                console.log("b")
                res.render("./Empleados", data);
            }
        })
    }else{
        res.redirect("/logEmp");
    }
});

rout.post("/Registrar_Empleado", (req,res)=>{
    var id = Math.floor(Math.random()*1000000);
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < 10; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    db.query(`select idEmpleado from Empleado;`, (error,results)=>{
        if(error){
            console.log(error);
            res.redirect("/signEmp");
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
    var setString = `insert into Empleado (idEmpleado, EApellido_Paterno, EApellido_Materno, ENombre, EContraseña, Administrador_idAdministrador) values (${id},"${req.body.AP}","${req.body.AM}","${req.body.Name}","${aleatoria}", ${sesion.userid})`;
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.render("../public/registro_Exitoso2",{id:id, aleatoria:aleatoria})
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
    if (sesion){
        res.render("Login_Empleado",{text: sesion.txterr})
        sesion.txterr = "";
    }else{
        res.render("Login_Empleado",{text: ""})
        req.session = null;
        sesion = req.session;
    }
});

rout.post("/logEmpleado",function(req,res){
    db.query(`select * from empleado where idEmpleado = ${req.body.id} ;`,(error,results)=>{
        if (error){
            sesion = req.session;
            sesion.txterr = "Hubo un error en el servidor, vuelva a intentarlo más tarde.";
            res.redirect("logEmp");
        }else if(results.length === 0){
            sesion = req.session;
            sesion.txterr = "ID no registrado.";
            res.redirect("logEmp");
        }else{
            results.forEach((row)=>{
                if(req.body.password == row.EContraseña){
                    sesion = req.session;
                    sesion.userid = req.body.id;
                    sesion.PW = req.body.password;
                    sesion.AP = row.EApellido_Paterno;
                    sesion.AM = row.EApellido_Materno;
                    sesion.name = row.ENombre;
                    sesion.type = "e";
                    sesion.idAdmin = row.Administrador_idAdministrador;
                    res.redirect("/stock");
                }else{
                    sesion = req.session;
                    sesion.txterr = "ID y contraseña no coinciden.";
                    res.redirect("logEmp");
                }
            })
        }
    });
});

rout.get("/Productos", (req,res)=>{
    if(sesion){
        var data;
        db.query(`SELECT * from Empleado a INNER JOIN Administrador b on a.Administrador_idAdministrador = b.idAdministrador INNER JOIN Producto c on a.Administrador_idAdministrador = c.idProducto WHERE idEmpleado = ${sesion.userid} ;`,(error, results)=>{
            if(error){
                console.log(error);
            }else if (results){
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid,Contraseña: sesion.PW, table:results};
                console.log("a");
                console.log(data)
                res.render("./Productos_index", data);
            }else{
                data = {nombre: sesion.name, AP:sesion.AP, AM: sesion.AM, ID: sesion.userid, Contraseña: sesion.PW ,table:null}
                console.log("b")
                res.render("./Productos_index", data);
            }
        })
    }else{
        res.redirect("/logEmp");
    }
})

rout.get("/signSucced", (req,res)=>{
    res.sendFile("/public/registro_Exitoso.html",{root:"."})
});

rout.get("/logOut",(req,res)=>{
    req.session = null;
    sesion = req.session;
    res.redirect("/");
})

rout.get("/addProduct",(req,res)=>{
    res.sendFile("/public/Agregar_Producto.html", {root:"."});
});

rout.post("/addProduct",upload.single('ImaP'),(req,res)=>{
    var fecha = Date.now();
    console.log(urlIma)
    var id = Math.floor(Math.random()*1000000);
    var setString = `insert into Producto (idProducto, PNombre, Precio, Descripcion, Imagen, Administrador_idAdministrador, Marca_idMarca, Existencias) values (${id},"${req.body.nombreP}",${req.body.PrecioP},"${req.body.DesPro}","uploads/${req.body.FileNameIMG}.${req.body.ImagenSRC}",${sesion.userid}, ${req.body.Marcas}, ${req.body.ExisP});`
    db.query(setString, (error)=>{
        if(error){
            console.log(error);
        }
    })
    res.redirect("/stock")
});

rout.post("/modProduct",(req,res)=>{
    console.log(req.body)
    db.query(`update producto SET PNombre = "${req.body.nombreP}", Descripcion = "${req.body.DesPro}", Precio =${req.body.PrecioP}, Existencias =${req.body.ExisP}, Marca_idMarca =${req.body.Marcas} where idProducto = ${req.body.idP}`,(error)=>{
        if(error){
            console.log(error);
            res.redirect("/stock");
        }else{
            res.redirect("/stock");
        }
    });
});

rout.post("/modifyProduct",(req,res)=>{
    res.render("Modificar_Producto.ejs",{idP:req.body.idP, PNombre:req.body.PNombre, Descripcion: req.body.Descripcion, Existencias: req.body.Existencias, Precio: req.body.Precio, Marca: req.body.MNombre})
});

rout.post("/deleteProduct",(req,res)=>{
    console.log(`DELETE from Producto where idProducto = ${req.body.idP}`)
    db.query(`DELETE from Producto where idProducto = ${req.body.idP}`,(error)=>{
        if(error){
            console.log(error);
        }
        res.redirect("stock");
    })
});



export const Rout = rout;