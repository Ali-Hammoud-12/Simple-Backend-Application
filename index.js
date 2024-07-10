const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Database connection configuration
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

        let html = `
        <html>
        <head>
            <title>Employee Information</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    color: #343a40;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    background-color: #ffffff;
                }
                th, td {
                    padding: 12px;
                    border: 1px solid #dee2e6;
                    text-align: left;
                }
                th {
                    background-color: #343a40;
                    color: #ffffff;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                .container {
                    max-width: 800px;
                    margin: auto;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #ffffff;
                }
                .employee-count {
                    margin: 20px 0;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Employee Information</h1>
                <div class="employee-count">Total Number of Employees: ${results.length}</div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                    </tr>`;

        results.forEach((employee) => {
            html += `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.position}</td>
                    </tr>`;
        });

        html += `
                </table>
            </div>
        </body>
        </html>`;

        res.send(html);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
