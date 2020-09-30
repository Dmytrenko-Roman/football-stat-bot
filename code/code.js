'use strict';

$.ajax({
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    url: 'http://api.football-data.org/v2/competitions/2021/standings',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    // do something with the response, e.g. isolate the id of a linked resource   
    console.log(response);
  });