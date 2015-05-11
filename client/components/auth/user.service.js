'use strict';

angular.module('notrApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      addCredit: {
        method: 'PUT',
        params: {
          controller: 'credit'
        }
      },
      deleteCard: {
        method: 'PUT',
        params: {
          controller: 'deletecard'
        }
      },
      editCard: {
        method: 'PUT',
        params: {
          controller: 'editcard'
        }
      },
      purchaseNote: {
        method: 'PUT',
        params: {
          controller: 'purchase'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
