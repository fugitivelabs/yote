const request = require(‘request’); 

const notificationUtils = {
  sendPush(receiver, text, callback) {
      console.log("sendPush fired..."); 
      // Check params
      // This is the notification payload, this can vary based on what type of notification you want to send
      var data = JSON.stringify({
          'to': receiver
          , 'notification': {
              'title': 'Yote'
              , 'text': text
              , 'badge': 1
          }
          , 'priority': 'high'
        });
      request(
      {
        url: 'https://gcm-http.googleapis.com/gcm/send' // This might be outdated - firebase url did not work at first 
        , method: 'POST'
        , headers: {
          'Content-Type': 'application/json'
          , 'Authorization': `key=xxxxxxxx` // This is the server  API key, save this in secrets
        }
        ,  body: data
      }, function(error, res, body){ 
        if(error) {
          console.log(error); 
          //callback(error); 
          //res.send(error); 
          if(callback) {
            callback(error);
          }
        } else {  
          console.log(body);
          if(callback) {
            callback(body);
          } 
          //callback(body); 
          //res.send(body); 
        }
      }); 
  }
}

export default notificationUtils; 
