const { Router } = require('express');

const userRoutes = require('./users');
const clientRoutes = require('./clients');
const authRoutes = require('./auth');
const healthRoutes = require('./health');

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/client', clientRoutes);
routes.use('/auth', authRoutes);
routes.use('/health', healthRoutes);

module.exports = routes;


const counter = (function counter() {
    let value = 0;
    return {
      getValue: function() {
        return value;
      },
      changeBy: function(k) {
        value += k;
      },
    };
  })();
  
  function stepCounter(k) {
    return {
      increment: function() {
        counter.changeBy(k);
      },
      decrement: function() {
        counter.changeBy(-k);
      },
      getValue: function() {
        return counter.getValue();
      },
    };
  }
  
  // Exemplo de uso
  const myCounter = stepCounter(2);
  console.log(myCounter.getValue()); // Saída: 0
  
  myCounter.increment();
  console.log(myCounter.getValue()); // Saída: 2
  
  myCounter.increment();
  console.log(myCounter.getValue()); // Saída: 4
  
  myCounter.decrement();
  console.log(myCounter.getValue()); // Saída: 2
  
  myCounter.decrement();
  console.log(myCounter.getValue()); // Saída: 0
  