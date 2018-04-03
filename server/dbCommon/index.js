class dbCommon {
    //private methods
    constructor(dbName) {
        this.dbName = dbName;
        this.mysql = module.require("mysql");
        this.dbHost = '127.0.0.1';                 // localhost for dev
        this.dbUser = 'root';                      // root for dev
        this.dbPassword = 'JusTeam3100Project!';   // plain text password? Really?
        this.dbPort = '3306';                      // port for dev
        this.pool = undefined;
        this.sqlQuery = this.sqlQuery.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
        this.getDBTime = this.getDBTime.bind(this);
        this.establishPool = this.establishPool.bind(this);
    }

    //wrapper method of SQL query, returns results.
    sqlQuery(sql, argList) {
        return new Promise(async (resolve,reject)=>{
            try{
                await this.checkConnection();
                sql = this.mysql.format(sql,argList);
                console.log('sql here: '+ sql);

                this.pool.query(sql, (err,results,fields)=>{
                    if(err) {
                        throw new Error("[DB Error] - "+err);
                    }
                    resolve(results);
                });
            }
            catch(err) {
                reject(err);
            }
        });
    }

    //checks if connection pool is established
    async checkConnection() {
        if(this.pool === undefined) {
            try {
                this.establishPool();
            }
            catch(err) {
                throw err;
            }
        }
    }

    //returns the current server time in [YYYY-MM-DD hh:mm:ss] format.
    getDBTime() {
        var date = new Date(Date.now());
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = date.getHours() + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return (Y + M + D + h + m + s);
    }

    async establishPool() {
        if (this.pool !== undefined) return;
        this.pool = await this.mysql.createPool({
            connectionLimit: 20,
            host: this.dbHost,
            user: this.dbUser,
            password: this.dbPassword,
            port: this.dbPort,
            database: this.dbName
        }, (err) => {
            if (err) {
                throw new Error("[DB Error] - " + err);
            }
        });
        return this.pool;
    }
}

module.exports = dbCommon;
