const moment = require('moment')

// https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates/32374035
const createDates = (startDate, stopDate)=> {
    var dateArray = [];
    var currentDate = moment(startDate, 'YYYY-MM-DD');
    var stopDate = moment(stopDate, 'YYYY-MM-DD');
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

const generateHours = (dates)=>{
    let hours = []
    for(let i = 0; i < dates.length; i++){
        let num = moment(dates[i]).day()
        // console.log(num)
        if(num === 0 || num === 6){
            // 8 AM
            hours.push(8)
        }
        else {
            // 4 PM
            hours.push(4)
        }
    }
    return hours
}

const getToday = ()=>{
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd=`0${dd}`;
    } 

    if(mm<10) 
    {
        mm=`0${mm}`;
    } 
    today = `${yyyy}-${mm}-${dd}`;
    return today
}


module.exports = {
    createDates,
    generateHours,
    getToday
}