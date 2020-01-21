import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';

const port = 5000;

/* Global variables */
let listingData, server;

function send404Response(response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write('Bad gateway error');
  response.end();
}

const requestHandler = (request, response) => {
    const parsedUrl = url.parse(request.url);

    if(request.method == 'GET' && parsedUrl.path == '/listings') {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(listingData);
      response.end();
    } else {
      send404Response(response);
    }
};

fs.readFile('listings.json', 'utf8', (err, data) => {
    // Check for errors
    if (err) throw err;

    // Save the sate in the listingData variable already defined
    listingData = data;

    // Creates the server
    server = http.createServer(requestHandler);

    // Start the server
    server.listen(port, () => {});
});
