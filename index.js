const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// database connection configuration
const db = mysql.createConnection({
    host: 'database-1.ctam8sm8cni0.eu-north-1.rds.amazonaws.com',
    user: 'root',
    password: '0yavvKc2zqk(5V-wN4pb{',
    database: 'ghaim'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.get('/', (req, res) => {

    db.query('SELECT * FROM employee_info', (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).send('Error fetching data from database');
            return;
        }

        let html = '<table border="1">';
        html += '<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Position</th></tr>';
        results.forEach((employee) => {
            html += `<tr><td>${employee.id}</td><td>${employee.first_name}</td><td>${employee.last_name}</td><td>${employee.email}</td><td>${employee.position}</td></tr>`;
        });
        html += '</table>';
        res.send(html);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
