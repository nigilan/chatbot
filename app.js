var Botkit = require('botkit');
var controller = Botkit.facebookbot({
        access_token: 'YOUR_ACCESS_TOKEN',
        verify_token: 'YOUR_VERIFY_TOKEN',
        debug:true
})

var bot = controller.spawn({
});


// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(3001,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
      console.log('This bot is online!!!');
  });
});

controller.api.messenger_profile.greeting('Hello! I\'m a Botkit bot!');


// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {
    console.log(message);
    bot.reply(message, 'Welcome to my app!');
});

// user said hello
controller.hears(['hello'], 'message_received', function(bot, message) {
    console.log('here',message.text)
    bot.reply(message, 'Hey there.');

});

controller.hears(['login'], 'message_received', function(bot, message) {
    bot.startConversation(message, function(err, convo) {
        convo.ask('Please input the username:', function(response, convo) {
            console.log(response.text);            
        });
        convo.ask('Please input the password:', function(response, convo) {
            console.log(response.text);
            convo.next();
        });
    });
});