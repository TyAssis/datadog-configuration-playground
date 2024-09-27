const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/date', (req, res) => {
    const date = new Date();
    console.log(date);
    res.json(date);
});

app.get('/multiline', (req, res) => {
    const multiline = `This is an
    very expe
    nsi
    ve
    m
    ul
    tilin
    e
    log
    gim
    me
    do
    ll
    ars
    $$$$    
    `
    console.log(multiline);
    res.json(multiline);
});

app.get('/sheriffs', (req, res) => {
    const sheriffs = [
        'Bill Tlighman',
        'Bat Masterson',
        'Harry Wheeler',
        'Harry Potter',
        'Henry Newton Brown',
        'Jhon Hicks Adams',
        'Heck Thomas',
    ]
    console.log(sheriffs[0]);
    console.log(sheriffs[1]);
    console.log(sheriffs[2]);
    console.log(sheriffs[3]);
    console.log(sheriffs[4]);
    console.log(sheriffs[5]);
    console.log(sheriffs[6]);
    res.json(sheriffs);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/garbage', (req, res) => {
    const date = new Date();
    console.log(date);
    const todo = `${new Date().toISOString()} TODO`;
    console.log(todo);
    const info = `${new Date().toISOString()} INFO`;
    console.log(info);
    const ip = `${new Date().toISOString()} 174.34.12.145`;
    console.log(ip);
    const email = 'mamamia@arena.im';
    console.log(email);
    const customerEmail = 'nick.sports@nicksports.com';
    console.log(customerEmail);
    const error = 'Error';
    console.log(error);
    const legitError = 'Error: missing required argument';
    console.log(legitError);
    const objobj = { a: 1, b: 2};
    console.log(objobj.toString())
    const objError = 'Object.keys is not a function of undefined';
    console.log(objError)
    res.json('ok');
});

process.on('SIGINT', () => {
    process.exit(0); // Exit the process
  });
  
process.on('SIGTERM', () => {
process.exit(0); // Exit the process
});