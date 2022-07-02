// Your code here

// employee record object
function createEmployeeRecord(testEmployee){
    let employee = {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}
// employee records array with callback of employee record object
function createEmployeeRecords(employeeArr) {
    return employeeArr.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeObj(typeOf, date){
    const dateStamp = date.split(' ')
    const hourStamp = dateStamp[1]
    const hourStampNum = parseInt(hourStamp, 10);  
    
    
return {
          type: typeOf,
          hour: hourStampNum,
          date: dateStamp[0]
       }
  
}

// time in event using data from employee record
function createTimeInEvent(record, date) {
     record.timeInEvents.push(createTimeObj('TimeIn', date))
      
       return record
    }

//time out event using data from the employee record
function createTimeOutEvent(record, date) {
        record.timeOutEvents.push(createTimeObj('TimeOut', date))
          return record
        }

//hour worked based off the date

function hoursWorkedOnDate(record, day) {
    const timeIn = record.timeInEvents.find(time => time.date === day)
    const timeOut  = record.timeOutEvents.find(time => time.date === day)    
    
    return (timeOut.hour/100) - (timeIn.hour/100);
}


function wagesEarnedOnDate(record, day) {
    const timeWorked = hoursWorkedOnDate(record, day)
    const wagesEarned = record.payPerHour
    return wagesEarned * timeWorked
}


function allWagesFor(record){
   //console.log(record)
    const allDays = record.timeInEvents.map((day) =>  wagesEarnedOnDate(record, day.date))
   //console.log(allDays);
  return allDays.reduce((accumulator, element) => accumulator +  element);
   
 }

function calculatePayroll(employeeArr2) {
    const totalPay = employeeArr2.map(emp => allWagesFor(emp))
    return totalPay.reduce((accumulator, element) => accumulator + element)}