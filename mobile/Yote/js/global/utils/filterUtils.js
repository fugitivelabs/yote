const filterUtils = {


  filterExercise(testString, exercise, movementMap) {
    var exerciseString = "";
    exerciseString += exercise.name; //don't care if we repeat, but want to match all possible strings
    exerciseString += exercise.metricLabel; //name + metric, or name + xvalue, or name + ylabel
    // exerciseString += exerciseMap[exerciseId].setsAndReps;
    exerciseString += exercise.name;
    exerciseString += exercise.xValue;
    exerciseString += exercise.baseYLabel;
    exerciseString += exercise.baseYValue;
    exerciseString += exercise.metricLabel;
    exerciseString += exercise.name;
    exerciseString += exercise.baseYLabel;
    exerciseString += exercise.baseYValue;
    exerciseString += exercise.metricLabel;
    exerciseString += exercise.name;
    exerciseString += exercise.metricLabel.replace(/of/g,''); //for matching metricLabels
    exerciseString += exercise.name;
    exerciseString += exercise.metricLabel.split(" ")[exercise.metricLabel.split(" ").length -1];
    //"back squat 1rm" and "back squat 100% 1rm" both match now

    // also search through draft content
    exerciseString += exercise.name;
    for(var i = 0; i < exercise.instructions.blocks.length; i++) {
      exerciseString += exercise.instructions.blocks[i].text;
    }

    // search through movements if it has movement
    exerciseString += exercise.name;
    if(exercise._movement && movementMap[exercise._movement]) {
      exerciseString += movementMap[exercise._movement].name;
      exerciseString += movementMap[exercise._movement].summary;
      // search through movement's draft content
      for(var j = 0; j < movementMap[exercise._movement].instructions.blocks.length; j++) {
        exerciseString += movementMap[exercise._movement].instructions.blocks[j].text;
      }
    }

    exerciseString.toLowerCase().trim();
    exerciseString = exerciseString.replace(/[^a-zA-Z0-9]/g,''); //replace all non-characters and numbers
    // console.log(exerciseString);

    return exerciseString.toLowerCase().indexOf(testString) > -1;
  }

  , filterSection(testString, section) {
    //or sectionTemplates
    var sectionString = "";
    sectionString += section.name;
    sectionString += section.description;
    // search through draftjs content
    sectionString += section.name;
    for(var i = 0; i < section.instructions.blocks.length; i++) {
      sectionString += section.instructions.blocks[i].text;
    }

    sectionString = sectionString.replace(/[^a-zA-Z0-9]/g,'');

    return sectionString.toLowerCase().indexOf(testString) > -1;

  }

  , filterWorkout(testString, workout) {
    //or workoutTemplates
    var workoutString = "";
    workoutString += workout.name;
    workoutString = workoutString.replace(/[^a-zA-Z0-9]/g,'');
    return workoutString.toLowerCase().indexOf(testString) > -1;

  }

  , filterUser(testString, user) {
    //or userTemplates
    var userString = "";
    userString += user.username;
    userString += user.firstName;
    userString += user.lastName;
    userString += user.handle;
    userString += user.firstName;
    userString += user.handle;
    userString += user.username;
    userString += user.handle;
    userString += user.firstName;
    userString += user.username;
    userString += user.lastName;

    userString = userString.replace(/[^a-zA-Z0-9]/g,'');
    return userString.toLowerCase().indexOf(testString) > -1;

  }

  , filterSquad(testString, squad, teamMap) {

    var squadString = "";
    squadString += squad.name;
    squadString += squad.description;
    // search through draftjs content
    squadString += squad.name;
    squadString += squad.description;
    if(squad._team && teamMap[squad._team]) {
      squadString += teamMap[squad._team].name;
      squadString += teamMap[squad._team].description;
    }

    squadString = squadString.replace(/[^a-zA-Z0-9]/g,'');

    return squadString.toLowerCase().indexOf(testString) > -1;
  }

  , filterMember(testString, member, userMap) {
    var memberString = "";
    memberString += member.email;

    // search through draftjs content
    memberString += member.email;
    if(member._user && userMap[member._user]) {
      memberString += userMap[member._user].username;
      memberString += userMap[member._user].firstName;
      memberString += userMap[member._user].lastName;
      memberString += userMap[member._user].handle;
      memberString += userMap[member._user].firstName;
      memberString += userMap[member._user].handle;
      memberString += userMap[member._user].lastName;
      memberString += userMap[member._user].handle;
      memberString += userMap[member._user].firstName;
      memberString += userMap[member._user].username;

    }

    memberString = memberString.replace(/[^a-zA-Z0-9]/g,'');

    return memberString.toLowerCase().indexOf(testString) > -1;
  }

  , findRankedUserSections(sectionId, sectionMap, userSection) {
    let section = sectionMap[sectionId];

    let sectionUserSections;
      if(userSection.lists.squadAndWorkout) {
        sectionUserSections = userSection.lists.squadAndWorkout.items.filter((userSectionId) => {
          return userSection.map[userSectionId]._section + "" === section._id + ""
        });
      } 
    
    let recursiveSortFn = function(a,b,i=0) {
        // console.log("recursiveSortFn");
        // console.log(i);
        // console.log(a);
        // console.log(userSection.map[a]);
        //big assumption: UserSection.results[i].metric == Section.leaderboardTrackingMetrics[i]
        // SHOULD always be the case, but if not we can add a (heavy) check
        if(i >= section.leaderboardTrackingMetrics.length) {
          // console.log("debug 1");
          return true; //nothing is separating the two users, so just return
        } else if(userSection.map[a].results[i].value == userSection.map[b].results[i].value) {
          // console.log("debug 2");
          //result[i]'s are equal, so check result[i+1]
          return recursiveSortFn(a,b,i+1);
        } else if(section.sortOrders[i] == "ascending"){
          // console.log("debug 3");
          return userSection.map[a].results[i].value - userSection.map[b].results[i].value
        } else {
          //default to 'descending'
          // console.log("debug 4");
          return userSection.map[b].results[i].value - userSection.map[a].results[i].value
        }
      }
      //filter out where usersection.results length !== metrics length
      let filteredUserSections = sectionUserSections.filter((id)=> userSection.map[id].results.length === section.leaderboardTrackingMetrics.length);

      // sort the filtered sections to find the correct ranking order 
      let sortedSectionUserSections = filteredUserSections.sort(recursiveSortFn);

      // assign overall rank to the object in memory so we can sort the list by individual results later 
      let rankedUserSections = sortedSectionUserSections.map((id, i) => {
        var newItem = userSection.map[id];
        newItem.rank = i + 1;
        return newItem;
      });  

      return rankedUserSections; 
  }

}

export default filterUtils;
