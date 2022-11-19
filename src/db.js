import {createPool} from "mysql2"
import {dbConfig} from "./deployConfig.js"

var dataBase = createPool(dbConfig);

export const db = dataBase;

