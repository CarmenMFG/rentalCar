const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
/*********************** GARAGES       ********************/
let GARAGES = [];

app.get('/garages', (req, res) => {
  res.send(GARAGES);
});

app.post('/garages', (req, res) => {
  GARAGES.push(req.body);
  res.send('Garages has been added successfully');
});
app.delete('/garages', (req, res) => {
  GARAGES = GARAGES.filter(({ id }) => id !== req.body.id);
  res.send('Garage has been deleted successfully');
});

app.put('/garages', (req, res) => {
  GARAGES = GARAGES.map((garage) =>
    garage.id === req.body.id ? req.body : garage
  );
  res.send('Garage updated successfully'+req);
});
/*********************** CARS       ********************/
let CARS = [];

app.get('/cars', (req, res) => {
  res.send(CARS);
});

app.post('/cars', (req, res) => {
  CARS.push(req.body);
  res.send('Cars has been added successfully');
});
app.delete('/cars', (req, res) => {
  CARS = CARS.filter(({ id }) => id !== req.body.id);
  res.send('Cars has been deleted successfully');
});

app.put('/cars', (req, res) => {
  CARS = CARS.map((car) =>
  car.id === req.body.id ? req.body : car);
  res.send('Cars updated successfully'+req);
});
/*********************** CUSTOMERS      ********************/
let CUSTOMERS = [];

app.get('/customers', (req, res) => {
  res.send(CUSTOMERS);
});

app.post('/customers', (req, res) => {
  CUSTOMERS.push(req.body);
  res.send('Customers has been added successfully');
});
app.delete('/customers', (req, res) => {
  CUSTOMERS = CUSTOMERS.filter(({ id }) => id !== req.body.id);
  res.send('Customer has been deleted successfully');
});

app.put('/customers', (req, res) => {
  CUSTOMERS = CUSTOMERS.map((customer) =>
  customer.id === req.body.id ? req.body : customer);
  res.send('Customers updated successfully'+req);
});

/*********************** BOOKINGS      ********************/
let BOOKINGS = [];

app.get('/bookings', (req, res) => {
  res.send(BOOKINGS);
});

app.post('/bookings', (req, res) => {
  BOOKINGS.push(req.body);
  res.send('Bookings has been added successfully');
});
app.delete('/bookings', (req, res) => {
  BOOKINGS = BOOKINGS.filter(({ id }) => id !== req.body.id);
  res.send('Bookings has been deleted successfully');
});

app.put('/bookings', (req, res) => {
  BOOKINGS = BOOKINGS.map((booking) =>
  booking.id === req.body.id ? req.body : booking);
  res.send('Bookings updated successfully'+req);
});







app.get('/', (req, res) => {
  res.status(200).send('Welcome to API Rest');
});

http.createServer(app).listen(8001, () => {
  console.log('Servidor arrancado en puerto 8001');
});
