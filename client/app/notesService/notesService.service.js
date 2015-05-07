'use strict';

angular.module('notrApp')
  .factory('notesService', [ '$resource', function ($resource) {
    return $resource('/api/notes/:id', {
      id: '@_id'
    },
    {
      getNotes : {
        method : 'GET',
        isArray: true
      },
      getNote : {
        method : 'GET'
      },
      deleteNote: {
        method : 'DELETE'
      }
    });
  }]);