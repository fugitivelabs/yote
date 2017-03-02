
const labelUtils = {
  getUserMaxLabel(metric) {
    switch(metric) {
      case "Weight (1RM)":
        return "1 Rep Max";
      case "Weight (2RM)":
        return "2 Rep Max";
      case "Weight (3RM)":
        return "3 Rep Max";
      case "Weight (4RM)":
        return "4 Rep Max";
      case "Weight (5RM)":
        return "5 Rep Max";
      case "Weight (6RM)":
        return "6 Rep Max";
      case "Weight (7RM)":
        return "7 Rep Max";
      case "Weight (8RM)":
        return "8 Rep Max";
      case "Weight (9RM)":
        return "9 Rep Max";
      case "Weight (10RM)":
        return "10 Rep Max";
      default:
        return metric;
    }
  }
  , getUserMetricLabel(metric) {
    switch(metric) {
      case "Weight (1RM)":
        return "% of 1RM";
      case "Weight (2RM)":
        return "% of 2RM";
      case "Weight (3RM)":
        return "% of 3RM";
      case "Weight (4RM)":
        return "% of 4RM";
      case "Weight (5RM)":
        return "% of 5RM";
      case "Weight (6RM)":
        return "% of 6RM";
      case "Weight (7RM)":
        return "% of 7RM";
      case "Weight (8RM)":
        return "% of 8RM";
      case "Weight (9RM)":
        return "% of 9RM";
      case "Weight (10RM)":
        return "% of 10RM";
      case "Weight (Actual)":
        return "Weight";
      case "Weight (% Bodyweight)":
        return "% Bodyweight";
      default:
        return metric;
    }
  }
  , getAuthorMetricLabel(metric) {
    switch(metric) {
      case "Weight (1RM)":
        return "Weight (% 1RM)";
      case "Weight (2RM)":
        return "Weight (% 2RM)";
      case "Weight (3RM)":
        return "Weight (% 3RM)";
      case "Weight (4RM)":
        return "Weight (% 4RM)";
      case "Weight (5RM)":
        return "Weight (% 5RM)";
      case "Weight (6RM)":
        return "Weight (% 6RM)";
      case "Weight (7RM)":
        return "Weight (% 7RM)";
      case "Weight (8RM)":
        return "Weight (% 8RM)";
      case "Weight (9RM)":
        return "Weight (% 9RM)";
      case "Weight (10RM)":
        return "Weight (% 10RM)";
      default:
        return metric;
    }
  }
  , getDefaultMetricTableCellLabel(metric, value) {
    switch(metric) {
      case `Weight (1RM)`:
        return `Default to ${value}% 1RM`;
      case `Weight (2RM)`:
        return `Default to ${value}% 2RM`;
      case `Weight (3RM)`:
        return `Default to ${value}% 3RM`;
      case `Weight (4RM)`:
        return `Default to ${value}% 4RM`;
      case `Weight (5RM)`:
        return `Default to ${value}% 5RM`;
      case `Weight (6RM)`:
        return `Default to ${value}% 6RM`;
      case `Weight (7RM)`:
        return `Default to ${value}% 7RM`;
      case `Weight (8RM)`:
        return `Default to ${value}% 8RM`;
      case `Weight (9RM)`:
        return `Default to ${value}% 9RM`;
      case `Weight (10RM)`:
        return `Default to ${value}% 10RM`;
      case "Weight (% Bodyweight)":
        return "Default to " + value + "% BW";
      case "Time":
        var duration = value;
        // console.log(parseInt(duration%1000));
        var milliseconds = parseInt((duration%1000)/10)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60)));

        var fHours = (hours < 10) ? "0" + hours : hours;
        var fMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var fSeconds = (seconds < 10) ? "0" + seconds : seconds;
        var fMilliseconds = milliseconds / 100;

        // console.log(fHours + ":" + fMinutes + ":" + fSeconds + "." + fMilliseconds);
        var formattedTime = fHours + ":" + fMinutes + ":" + fSeconds + "." + milliseconds;
        return "Default to " + formattedTime;
      case `Feet`:
        return `Default to ${value} ft`;
      case `Volume`:
        return `Default to ${value} vol.`;
      case `Points`:
        return `Default to ${value} pts`;
      case `Inches`:
        return `Default to ${value} in`;
      case `Yards`:
        return `Default to ${value} yds`;
      case `Miles`:
        return `Default to ${value} mi`;
      case `Meters`:
        return `Default to ${value} m`;
      case `Kilometers`:
        return `Default to ${value} km`;
      case `Weight (Actual)`:
        return `Default to ${value} lbs`;
      default:
        return `Default to ${value} ${metric}`;
    }
  }
  , getMetricTableCellLabel(metric, value) {
    let cellLabel;
    switch(metric) {
      case "Weight (Actual)":
        var kgValue = (value * 0.45359237).toFixed(1);
        cellLabel = value + "lbs (" + kgValue + "kgs) ";
        break;
      case "Weight (1RM)":
        cellLabel = value + "% 1RM";

        break;
      case "Weight (2RM)":
        cellLabel = value + "% 2RM";
        break;
      case "Weight (3RM)":
        cellLabel = value + "% 3RM";
        break;
      case "Weight (4RM)":
        cellLabel = value + "% 4RM";
        break;
      case "Weight (5RM)":
        cellLabel = value + "% 5RM";
        break;
      case "Weight (6RM)":
        cellLabel = value + "% 6RM";
        break;
      case "Weight (7RM)":
        cellLabel = value + "% 7RM";
        break;
      case "Weight (8RM)":
        cellLabel = value + "% 8RM";
        break;
      case "Weight (9RM)":
        cellLabel = value + "% 9RM";
        break;
      case "Weight (10RM)":
        cellLabel = value + "% 10RM";
        break;
      case "Weight (% Bodyweight)":
        cellLabel = value + "% Bodyweight";
      case "Volume":
        cellLabel = value + " Total";
        break;

      case "Points":
        cellLabel = value + " Points";
        break;
      case "Time":
        var duration = value;
        // console.log(parseInt(duration%1000));
        var milliseconds = parseInt((duration%1000)/10)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60)));

        var fHours = (hours < 10) ? "0" + hours : hours;
        var fMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var fSeconds = (seconds < 10) ? "0" + seconds : seconds;
        var fMilliseconds = milliseconds / 100;

        // console.log(fHours + ":" + fMinutes + ":" + fSeconds + "." + fMilliseconds);
        var formattedTime = fHours + ":" + fMinutes + ":" + fSeconds + "." + milliseconds;
        cellLabel = "Time " + formattedTime;
        break;
      case "Feet":
        cellLabel = value + " Feet";
        break;
      case "Meters":
        cellLabel = value + " Meters";
        break;
      case "Miles":
        cellLabel = value + " Miles";
        break;
      case "Reps":
        cellLabel = value + " Reps";
        break;
      default:
        cellLabel = "Label";
    }
    return cellLabel;
  }
  , getLeaderboardValue(metric, value) {
    let cellLabel;
    switch(metric) {
      
      case "Volume (lbs)":
        cellLabel = value + " vol.";
        break;
      case "Volume (kgs)":
        cellLabel = value + " vol.";
        break;
      case "Points":
        cellLabel = value + " pts";
        break;
      case "Pounds":
        cellLabel = value + " lbs";
        break;
      case "Kilograms":
        cellLabel = value + " kgs";
        break;
      case "Calories":
        cellLabel = value + " cal";
        break;
      case "Rounds":
        cellLabel = value + " rds";
        break;
      case "Watts":
        cellLabel = value + " W";
        break;
      case "Time":
        var duration = value;
        // console.log(parseInt(duration%1000));
        var milliseconds = parseInt((duration%1000)/10)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60)));

        var fHours = (hours < 10) ? "0" + hours : hours;
        var fMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var fSeconds = (seconds < 10) ? "0" + seconds : seconds;
        var fMilliseconds = milliseconds / 100;

        // console.log(fHours + ":" + fMinutes + ":" + fSeconds + "." + fMilliseconds);
        var formattedTime = fHours + ":" + fMinutes + ":" + fSeconds + "." + milliseconds;
        cellLabel = formattedTime;
        break;
      case "Feet":
        cellLabel = value + " ft";
        break;
      case "Meters":
        cellLabel = value + " m";
        break;
      case "Miles":
        cellLabel = value + " mi";
        break;
      case "Reps":
        cellLabel = value + " reps";
        break;
      default:
        cellLabel = value;
    }
    return cellLabel;
  }
}

export default labelUtils;
