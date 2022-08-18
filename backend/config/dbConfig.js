const mysql = require("mysql")

var pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "secondzoja.com",
  debug: false,
})

let sql = {
  insertQuery: (tableName, values, cb) => {
    // console.log(values)
    let iQ = `INSERT into ${tableName} (${Object.keys(
      values
    )}) VALUES (${Object.values(values).map((val) => {
      let valueReplaced =
        typeof val == "string" && val.includes("'")
          ? val.replace("'", "`")
          : val
      return "'" + valueReplaced + "'"
    })}) `
    pool.query(iQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  updateQuery: (tableName, values, cb, idName = null, idVal = null) => {
    console.log(idName, idVal,'id name in update query')
    let uQ = `
    UPDATE ${tableName} SET ${Object.keys(values).map((key, i) => {
      let valueReplaced =
        typeof Object.values(values)[i] == "string" &&
        Object.values(values)[i].includes("'")
          ? Object.values(values)[i].replace("'", "`")
          : Object.values(values)[i]
      return key + "=" + "'" + valueReplaced + "'"
    })}  
    WHERE(${idName}='${idVal}') `
    pool.query(uQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  deleteQuery: (tableName, id, cb) => {
    let dQ = `DELETE from ${tableName}  WHERE(id='${id}')`
    pool.query(dQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  selectQuery: (
    tableName,
    values,
    cb,
    specificCols = null,
    allRecords = false
  ) => {
    let sQ = `SELECT ${
      specificCols == null
        ? "*"
        : specificCols.map((key, i) => {
            return key
          })
    } FROM ${tableName} ${
      allRecords == false
        ? "WHERE " +
          Object.keys(values).map((key, i) => {
            return key + "=" + "'" + Object.values(values)[i] + "'"
          })
        : ""
    } `
    let replaced_sQ =
      Object.keys(values).length > 1 ? sQ.replace(/[,]/gim, " AND ") : sQ
    console.log(replaced_sQ)
    pool.query(replaced_sQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  customQuery: (query, cb) => {
    pool.query(query, (e, result) => {
      // prevResultToAppend
      //   ? e
      //     ? cb(e, true)
      //     : cb(result, false, prevResultToAppend)
      //   : e
      //   ? cb(e, true)
      //   : cb(result, false)
      e ? cb(e, true) : cb(result, false)
    })
  },
}

module.exports = {sql, pool}
