var net = require('net');
var mysql = require('mysql');
var client = new net.Socket();

// my sql
var con = mysql.createConnection({
	host: "sql11.freesqldatabase.com",
	user: "sql11224171",
	password: "aJQMZId8vm",
	database: "sql11224171"
});
con.connect(function (err) {
	if (err) throw err;
	console.log("DB Connected!");
});
//
client.connect(1337, 'localhost', function () {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function (data) {
	console.log('Received: ' + data);
	inserValues(data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function () {
	console.log('Connection closed');
});

function inserValues(gpsValue) {
	var sql = "INSERT INTO gps_datas (date, gpsvalue) VALUES (CURRENT_TIMESTAMP(),'" + gpsValue + "' )";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("data inserted: ");
	});
}