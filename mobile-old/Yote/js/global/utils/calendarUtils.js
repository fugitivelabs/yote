const calendarUtils = {

  //calendar gen methods
  // getPrevSundayPadding(date) {

  // }

  getFullCalendarArray(year, month) {
    console.log("getting full calendar array for " + month + "/" + year);
    let calendarDayArray = []; //all days TO DISPLAY (includes previous and next month on either end of current month)
    let firstOfMonth = new Date(year, month);
    //add previous month days to the beginning of the array. ex: if firstOfMonth is on a Tuesday (day == 2), we add days 0 and 1 (Sunday and Monday)

    for(var i = 0; i < firstOfMonth.getDay(); i++) {
      let nextDate = calendarUtils.initDateTZ(firstOfMonth);
      nextDate.setDate(nextDate.getDate() - (i + 1));
      calendarDayArray.unshift(nextDate);
    }
    //add firstOfMonth
    calendarDayArray.push(firstOfMonth);
    //add rest of the month
    for(var i = 1; i < 37; i++) {
      let nextDate = calendarUtils.initDateTZ(firstOfMonth);
      nextDate.setDate(nextDate.getDate() + i);
      if(nextDate.getMonth() == firstOfMonth.getMonth()) {
        calendarDayArray.push(nextDate); //add if same month
      }
    }
    //finally, add next month up until the following saturday
    let lastOfMonth = calendarDayArray[calendarDayArray.length - 1];
    for(var i = 1; i < (7 - lastOfMonth.getDay()); i++) {
      let nextDate = calendarUtils.initDateTZ(lastOfMonth);
      nextDate.setDate(nextDate.getDate() + i);
      calendarDayArray.push(nextDate);
    }
    //array contains full month of days plus padding on either side to make divisible by 7
    return calendarDayArray;
  }

  , getDaysFromStart(startDate, targetDate) {
    var start = new Date(startDate);
    var target = new Date(targetDate);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);
    var daysFromStart = Math.floor((target.getTime() - start.getTime()) / 86400000);
    return daysFromStart;
  }

  , getDayString(day) {
    //accepts 0..6 and returns Sunday...Saturday
    switch(day) {
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
      default:
        return "Invalid"
    }
  }
  , getShortDayString(day) {
    //accepts 0..6 and returns Sunday...Saturday
    switch(day) {
      case 0:
        return "S"
      case 1:
        return "M"
      case 2:
        return "T"
      case 3:
        return "W"
      case 4:
        return "T"
      case 5:
        return "F"
      case 6:
        return "S"
      default:
        return "-"
    }
  }

  , getMonthString(month) {
    //accepts 0..11 and returns January...December
    switch(month) {
      case 0:
        return "January"
      case 1:
        return "February"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "August"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"
      default:
        return "Invalid"
    }
  }

  , getWeekNum(dayKey) {
    let mapIndex = parseInt(dayKey) - 1;
    let weekNum = Math.floor(mapIndex / 7 ) + 1;
    return weekNum;
  }

  , getDayNum(dayKey) {
    let mapIndex = parseInt(dayKey) - 1;
    let dayNum = mapIndex % 7 + 1;
    return dayNum;
  }

  , getDayDate(startDate, dayKey) {
    var start = calendarUtils.initDateTZ(startDate);
    var days = parseInt(dayKey) - 1;
    return start.setDate(start.getDate() + days);
  }

  , initDateTZ(date = new Date()) {
    //force local client timezone when determining dates
    // see web/calendarUtils for implementation notes
    const msToAdd = new Date().getTimezoneOffset() * 60 * 1000;
    const intermediate = new Date(date);
    return new Date(intermediate.getTime() + msToAdd); 
  }

  //program/date methods
  , programInInterval(program, start, end) {
    //helper. returns true if program has any days in specified interval
    const programStartMS = new Date(program.startDate).getTime();
    const programEndMS = new Date(program.endDate).getTime();
    if(start.getTime() <= programStartMS && programStartMS <= end.getTime()) {
      //program starts in interval
      return true;
    } else if(start.getTime() <= programEndMS && programEndMS <= end.getTime()) {
      //program ends in interval
      return true;
    } else if(programStartMS < start.getTime() && programEndMS > end.getTime()) {
      //program encompasses entire interval
      return true;
    } else {
      return false;
    }
  }

  //TODO: needs testing.
  , checkValidProgramDates(newProgram, allPrograms) {
    //similar to server check method of the same name in programs.js
    // checks to see if a new program is valid based on all other program
    // if any program dates overlap, returns false.
    // right now check is implemented on the server side when saving/updating, but we will want it on the front end too

    let invalid = false;
    for(var i = 0; i < allPrograms.length; i++) {
      //set invalid to true if newProgram falls on interval of existing program
      invalid = this.programInInterval(newProgram, allPrograms[i].startDate, allPrograms[i].endDate) ? true : invalid;
    }
    console.log("Program valid? " + !invalid);
    return (!invalid);
  }

  , programOnDay(program, date) {
    //true if program exists on date
    const programStartMS = calendarUtils.initDateTZ(program.startDate).getTime();
    const programEndMS = calendarUtils.initDateTZ(program.endDate).getTime();
    return (programStartMS <= date.getTime() && date.getTime() <= programEndMS);
  }

  , findProgramDay(program, date) {
    if(program == null || date == null) {
      return null;
    }
    //returns program dayMap day of date. should be called after programOnDay.
    const programStartMS = new Date(program.startDate).getTime();
    //should be (date - startDate) / ms in a day
    return Math.floor((date.getTime() - programStartMS) / (1000 * 60 * 60 * 24)) + 1; //dayMap starts at 1
  }

  , findProgramFromList(programs, date) {
    if(programs == null || date == null) {
      return null;
    }
    //pass list of programs and date and return program on that day
    for(var i = 0; i < programs.length; i++) {
      if(this.programOnDay(programs[i], date)) {
        return programs[i];
      }
    }
    return null;
  }

}

export default calendarUtils;
