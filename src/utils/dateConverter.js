const moment = require('moment');

const dateConverter = (date) => {
    const newDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    
    return new Date(newDate);
}

module.exports = {
    dateConverter
};