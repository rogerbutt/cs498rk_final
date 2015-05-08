'use strict';

angular.module('notrApp')
  .factory('notesService', [ '$resource', function ($resource) {
    return $resource('/api/notes/:id:searchopts', {
      id: '@_id'
    },
    {
      getNotes : {
        method : 'GET',
        isArray: true,
      },
      getNotesNames : {
        method : 'GET',
        isArray: true,
        params: {
          searchopts : '?select={"name" : 1}'
        }
      },
      createNote : {
        method : 'POST'
      },
      getNote : {
        method : 'GET'
      },
      deleteNote: {
        method : 'DELETE'
      },
      
    });
  }]);