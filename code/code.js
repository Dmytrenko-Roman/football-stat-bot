'use strict';

match.ajax({
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    url: 'http://api.football-data.org/v2/matches?status='+ LIVE +'',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    // do something with the response, e.g. isolate the id of a linked resource   
    console.log(response);
  });