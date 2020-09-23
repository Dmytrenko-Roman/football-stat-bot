const fetch = require('node-fetch');

const body = { a: 1 };
const url = "https://1xbet.whoscored.com/Players/119501/Show/Serge-Gnabry";

fetch(url, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));