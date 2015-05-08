'use strict';

angular.module('notrApp')
  .factory('commentsService', ['$resource', function ($resource) {
    return $resource('/api/comments/:id', {
    	id: '@_id'
    },
    {
    	getComments : {
    		method: 'GET', 
    		isArray: true
    	},
    	postComment : {
    		method: 'POST'
    	}
    });
   }]);
