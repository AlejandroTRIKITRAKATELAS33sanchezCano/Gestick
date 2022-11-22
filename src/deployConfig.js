import parseDatabaseUrl from "parse-database-url";
const sqlurl = process.env.MYSQLURL || "mysql://root:alesonic1111@localhost:3306/Gestick";
const dbCon = parseDatabaseUrl(sqlurl);

export const port = process.env.PORT || 3000;

export const dbConfig = dbCon;