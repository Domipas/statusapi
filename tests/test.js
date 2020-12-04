const request = require('request');
const base_url = 'http://localhost:8284';
const auth = 'Bearer A4FmQ59LXt7eLr5HXr9CDlf4VaMNyqSWppIbFKhkZFCwHLzW733EAKqwWwGmfnV59qrBSje3qoS2seXwDnVehazMk935sD7Bgxl';
try {
    request({'method': 'GET', 'url': base_url+'/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/time/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/clients/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/clients/time/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/service/', 'headers': {'Authorization': auth}, form: {'service': '[]'}}, function (error, response) {
        if (response.statusCode !== 404) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/client/', 'headers': {'Authorization': auth}, form: {'client': '[]'}}, function (error, response) {
        if (response.statusCode !== 404) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/version/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/login/', 'headers': {'Authorization': auth}, form: {
        'loginkey': 'Sx5gpwNnOdD0vtx1x4Ymau4LowkCwurF0cWWSc8b2Ns4gBZ177ZUtPSQo1LwS63qOg2jKSPhFFK6gGJ4ev7SmX9WIi1K4caz7NC'
      }}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'POST', 'url': base_url+'/login/', 'headers': {'Authorization': auth}, form: {
        'loginkey': 'Sx5gpwNnOdD0vtx1x4Ymau4LowkCwurF0cWWSc8b2Ns4gBZ177ZUtPSQo1LwS63qOg2jKSPhFFK6gGJ4ev7SmX9WIi1K4caz7NC'
      }}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'GET', 'url': base_url+'/login/', 'headers': {'Authorization': auth}, form: {
        'loginkey': 'zxaYGaMHL5fjd29f6E0xseuzDznvjPHUOfBZ682GRXDF3yFP8PXF5CbyAN6O0Qk0QdHyzcVB7erEUQT3JRIfrFiUAgjUUhUm882'
      }}, function (error, response) {
        if (response.statusCode !== 403) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'POST', 'url': base_url+'/login/', 'headers': {'Authorization': auth}, form: {
        'loginkey': 'zxaYGaMHL5fjd29f6E0xseuzDznvjPHUOfBZ682GRXDF3yFP8PXF5CbyAN6O0Qk0QdHyzcVB7erEUQT3JRIfrFiUAgjUUhUm882'
      }}, function (error, response) {
        if (response.statusCode !== 403) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'POST', 'url': base_url+'/update/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
    request({'method': 'POST', 'url': base_url+'/clients/update/', 'headers': {'Authorization': auth}, form: {}}, function (error, response) {
        if (response.statusCode !== 200) throw new Error('Request Failed.\n' + `Status Code: ${response.statusCode}`)
        if (error) throw new Error(error);
    });
} catch (error) {
    console.error(error.message);
    process.exit(1);
}