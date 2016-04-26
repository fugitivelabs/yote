var secrets = require('../config')[process.env.NODE_ENV].secrets;

var async = require('async')
  , mandrill = require('mandrill-api/mandrill')
  , mandrill_client = new mandrill.Mandrill(secrets.mandrill)
  ;

exports.sendEmail = function(targets, subject, content, callback) {
  logger.debug("trying to send email");
  //message fields
  var msg = {
    important: true
    , track_opens: true
    , track_clicks: true
    , auto_text: true
    , auto_html: true
    , preserve_recipients: true
    , view_content_link: true
    , signing_domain: "fugitivelabs.com"
    , from_email: "accounts@fugitivelabs.com"
    , from_name: "Fugitive Labs"
    , to: []
    , subject: subject
    , html: content
  }
  for(var i = 0; i < targets.length; i++) {
    msg.to.push({
      "type": "to" //type = "cc" or something?
      , "email": targets[i]
    });
  }

  mandrill_client.messages.send({ "message": msg, "async": false }, function(result) {
    logger.debug(result);
    callback({success: true, message: "email(s) sent", result: result});
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    logger.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    callback({success: false, message: "Failed to send email.", error: e});
  });
}
