# Olog Web Client

This project implements a web client for the Phoebus Olog logbook service. It provides read, write and search capabilities, but not the full feature set of the CS Studio logbook client, see https://github.com/ControlSystemStudio/phoebus

Technology stack:
* ReactJS (main framework)
* Axios & Redux Toolkit (app state, http clients)
* Remarkable for commonmark processing/rendering (https://github.com/jonschlinkert/remarkable)
* Jest for unit testing
* Cypress and docker-compose for end-to-end testing

## Commonmark support
Markup as defined by the Commonmark specification is supported, see https://commonmark.org/.

Commonmark cheatsheet: https://commonmark.org/help/

### Commonmark extensions
The following extensions are supported:
- Image size, e.g. `![alt-text](http://foo.bar.com/image.jpg){width=640 height=480}`.
- Tables, see https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/organizing-information-with-tables.

## Current state of affairs:

Available:
* Search and read log entries, no authentication required.
* Display log entry details, including image thumbnails, links to non-image attachments and properties.
* Login to Phoebus Olog backend.
* Create new log entry, including attachments. Input is validated.
* Search criteria: list of logbooks, list of tags, time span, title, description, level and author.
* Custom dialog for embedding images (from file system) into log entry body.
* Support for URLs to show single log entry, e.g. http://my.olog.server.com/logs/1234.
* Support for grouping log entries through a "reply" button. 
* List view for search results.
* Properties editor.
* HTML preview of log entry, including embedded images.

Backlog:
* Localization.

## Site customization

The file `customization.js` contains customizable items. Please review its contents and adjust to your needs.

## Development 

### Environment

In order to develop and test with reasonable effort you will need the proper toolchain:

1) Node JS, install latest (>= 17.x) version.
2) A reasonably clever text editor. Visual Studio Code is a good alternative as it comes with some support for React development.
3) Optional: a React JS add-on to your browser.

## Development

Install the toolchain and then:

1) Clone this project and cd to it.
2) Invoke ``> npm install`` to download dependencies. Various warning messages may be shown (e.g. missing git support on Mac, deprecated versions).
3) Create a ``.env`` file in the root directory. Add the line:
   ``REACT_APP_BASE_URL='url-to-Phoebus-Olog-service'``.
4) Launch the Phoebus Olog backend.
5) Invoke ``>npm start`` to launch the Node JS development server. Web application available on ``http://localhost:3000``.
6) Develop.

### Unit testing

Unit test code are added in files named ``*.test.js``.
   
To run tests, invoke ``>npm test``.

## Deployment

The below instructions apply to a deployment scenario where a web server hosts the (static) web client resources, and at the same time acts as a reverse proxy resolving calls to the Phoebus Olog backend (which need not run on the same host).

1) Review the file `customization.js`. It contains a few values defining text resources that might differ between sites. If you need different values, update according to your needs, but please do not commit the changes.

2) Build the deployment artifacts:\
   `>REACT_APP_BASE_URL=Olog/ npm run-script build`\
   Note that the `REACT_APP_BASE_URL=Olog/` portion of the command is needed in order to override whatever value in the `.env` file. The actual value will depend on 
   how the web application is deployed.
   
   This will generate files in the `build` directory, all of which must be copied to the target web server. Publish the web client resource under the root context, i.e. the URL `http://<host>/` shall resolve to the file `index.html` found in the build output.
   
3) On the target web server, configure the reverse proxy to map the path /Olog to the Phoebus Olog backend. On Apache this is done like so (the rewrite rules may not be needed on other type of front end servers):

  ```
  <VirtualHost *:80>
    ProxyPreserveHost On
    ServerName <my server name>
    ProxyPass /Olog/ http://localhost:8080/Olog/
    ProxyPassReverse /Olog/ http://localhost:8080/Olog/
    
    <Directory "/path/to/npm/build/output">
       RewriteEngine on
       RewriteCond %{HTTP_ACCEPT} text/html
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteRule ^ index.html [last]
       RewriteRule ^ - [last]
    </Directory>
  </VirtualHost>
  ```
   
  
   In this example the Phoebus Olog backend is deployed on the same host on port 8080. If the 
   




