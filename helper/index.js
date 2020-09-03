
const axios = require('axios')
const moment = require('moment')

module.exports = {
    globalResponse : (res,statusCode,status,msg,result="",err = "",isMobile = false)=>{
        return res.status(statusCode).json({'status':status,'msg':msg,data:result,err:err})

    },
    formErrors: (errors) => {
        let response = [];

        for (var err in errors) {
            response.push(errors[err][0]);
        }
        return response;
    },
    dbInsert: async (con, table, data, isBatch = false, columns = "") => {
        return new Promise(async (resolve, reject) => {
            //logic goes here
            if (table == "") {
                reject("table name is required");
            }
            if (isBatch) {
                if (columns == "") {
                    reject(
                        "please specify column names in order to batch insert"
                    );
                }
                if (!(data instanceof Array)) {
                    reject("data should be array");
                }

                let query = `
                        INSERT INTO
                            ${table}
                            (${columns})
                        VALUES ?
                    `;
                    console.log(data,{columns})
                try {
                    let result = await con.query(query, [data]);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            } else if (!isBatch) {
                if (data instanceof Array) {
                    reject("data should be object");
                }
                let query = `
                        INSERT INTO
                            ${table}
                        SET ?
                    `;
                try {
                    let result = await con.query(query, [data]);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        });
    },
    errorResponse: (res, err) => {
        return res
            .status(500)
            .json({
                status: 0,
                msg: "Something Went Wrong",
                data: [],
                err: err.message ? err.message : err,
            });
    },
    fetch: async (
        con,
        table,
        columns = false,
        condition = "",
        orderBy = false
    ) => {
        let query = `
            SELECT
                ${columns ? columns : `*`}
            FROM
                ${table} `;
        if (condition) {
            query += `
                    WHERE 
                    ${condition}
                `;
        }

        if (orderBy) {
            query += ` ORDER BY ${orderBy}`;
        }

        return await con.query(query);
    },
    commonQuery : async(con,query)=>{

                try {
                    const result = await con.query(query);
                    return result
                } catch (e) {
                    throw new Error(e)
                }
    },
    dbUpdate:async(con,table,data,condition)=>{

            try {
                  const query = `
                                    UPDATE
                                        ${table}
                                    SET
                                        ?
                                    WHERE
                                        ${condition}
                                `  
                   const result = await con.query(query,[data]);
                   return result;
            } catch (e) {
                
                throw new Error(e)
            }
    },
    hashPassword:async(password)=>{
        try{
        const salt = await bcrypt.genSalt(10)
        const result = await bcrypt.hash(password,salt);
        return result
        }catch(e){
            console.log(e)
        }
    },
    comparePassword : async(password,hashPassword)=>{

        const result = await bcrypt.compare(password,hashPassword);
        return result;
 
    },
    getFormatedDate:(date,format24=true)=>{
                if(format24){
                    return moment(date).format('YYYY-MM-DD hh:mm:ss')
                }
                else{
                    return moment(date).format('YYYY-MM-DD')
                }
    },
}