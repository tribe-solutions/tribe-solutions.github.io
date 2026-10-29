(function () {
  if (window.chatwootSDK || document.getElementById('atenux-webchat-sdk')) return;

  var baseUrl = 'https://chat.atenux.com';
  window.chatwootSettings = {
    locale: 'pt_BR',
    position: 'right',
    type: 'standard',
    launcherTitle: 'Converse com a Tribe',
  };

  var script = document.createElement('script');
  script.id = 'atenux-webchat-sdk';
  script.src = baseUrl + '/packs/js/sdk.js';
  script.async = true;
  script.onload = function () {
    window.chatwootSDK.run({
      websiteToken: '57fZGmCJVzRA3mcKqpZefaT8',
      baseUrl: baseUrl,
    });
  };
  document.head.appendChild(script);
})();
