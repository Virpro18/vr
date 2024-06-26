const mysql = require(`mysql2`);


const connection = mysql.createConnection({
    host: "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    user: "4FPpUvpnhitcBv5.root",
    password: "WXtx5PHoEIW5Lr1Q",
    database: "test",
    port: 4000,
    ssl: {
        rejectUnauthorized: true
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});


module.exports = connection;
