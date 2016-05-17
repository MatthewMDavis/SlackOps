window.fbAsyncInit = function() {
  FB.init({
    appId      : '<%= ENV["FACEBOOK_APP_ID"] %>',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.6',
    status    : true
  });
};

// Insert the Facebook JS sdk into the page headers
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
