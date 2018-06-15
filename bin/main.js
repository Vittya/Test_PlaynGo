require.config({
	baseUrl: '.',
	paths: {
		'App': 'app'
	},
	waitSeconds: 20,
	urlArgs: 't=20160320000000' //flusing cache, do not use in production
});

require(['App'], function(App) {
	new App();
});
