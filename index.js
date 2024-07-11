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

        db.query('SELECT COUNT(*) AS total FROM employee_info', (err, countResult) => {
            if (err) {
                console.error('Error querying MySQL:', err);
                res.status(500).send('Error fetching data from database');
                return;
            }

            const totalEmployees = countResult[0].total;

            let html = `
            <html>
            <head>
                <title>Employee Information</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 80%;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    table, th, td {
                        border: 1px solid #ddd;
                    }
                    th, td {
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .total {
                        margin: 20px 0;
                        font-size: 18px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Employee Information</h1>
                    <div class="total">Total Employees: ${totalEmployees}</div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                        </tr>`;
            
            results.forEach((employee) => {
                html += `<tr>
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
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
