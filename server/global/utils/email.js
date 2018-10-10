/**
 * Global utililty methods.
 *
 * NOTE:  You will need your own Mandrill API key, or change these to work with
 * some other email service.
 */

// import secrets
let secrets = require('../../config')[process.env.NODE_ENV].secrets;

// import libraries
// let async = require('async');
let mandrill = require('mandrill-api/mandrill');
let mandrill_client = new mandrill.Mandrill(secrets.mandrill);
let logger = global.logger;

exports.sendEmail = function(targets, subject, content, callback) {
  logger.debug("trying to send email");
  // message fields
  let msg = {
    important: true
    , track_opens: true
    , track_clicks: true
    , auto_text: true
    , auto_html: true
    , preserve_recipients: true
    , view_content_link: true
    , signing_domain: "fugitivelabs.com"
    , from_email: "yote@fugitivelabs.com"
    , from_name: "Yote"
    , to: []
    , subject: subject
    , html: content
  }

  // build recipients list
  for(var i = 0; i < targets.length; i++) {
    msg.to.push({
      "type": "to"
      , "email": targets[i]
    });
  }

  // // for testing: don't actually send any emails
  // callback({success: true, message: "email(s) sent", result: {}});

  // for deployment: actually send emails
  mandrill_client.messages.send({ "message": msg, "async": false }, function(result) {
    logger.debug(result);
    callback({success: true, message: "email(s) sent", result: result});
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    logger.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    callback({success: false, message: "Failed to send email.", error: e});
  });
}


exports.sendEmailTemplate = function(targets, subject, template_name, template_content, html, text, fromInfo, callback) {
  logger.debug("trying to send email");

  // message fields
  var msg = {
    important: true
    , track_opens: true
    , track_clicks: true
    , auto_text: true
    , auto_html: true
    , preserve_recipients: false
    , view_content_link: true
    , signing_domain: "fugitivelabs.com"
    , from_email: "admin@fugitivelabs.com"
    , from_name: "Yote"
    , to: []
    , subject: subject
    , html: html
    , text: text
  }

  // build recipients list
  for(var i = 0; i < targets.length; i++) {
    msg.to.push({
      "type": "to"
      , "email": targets[i]
    });
  }

  // // for testing: don't actually send any emails
  // callback({success: true, message: "email(s) sent", result: {}});

  // for deployment: actually send emails
  mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": msg, "async": true }, function(result) {
    logger.debug("mandrill send success");
    logger.debug(result);
    callback({success: true, message: "email(s) sent", result: result});
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    logger.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    callback({success: false, message: "Failed to send email.", error: e});
  });

}
