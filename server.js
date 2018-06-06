var net = require('net');
var mysql = require('mysql');
var client = new net.Socket();

// my sql
var con = mysql.createConnection({
	host: "db4free.net",
	user: "saifal",
	password: "saifal@123",
	database: "saifal123"
});
con.connect(function (err) {
	if (err) throw err;
	console.log("DB Connected!");
});
//
client.connect(2222, 'localhost', function () {
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