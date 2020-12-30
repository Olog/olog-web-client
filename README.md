# Olog es web client

Note: this is work in progress. 

This project implements a web client for the olog es logbook service. The objective is to provide read, write and search capabilities, though not the full feature set of the CS Studio logbook client, see https://github.com/ControlSystemStudio/phoebus

Technology stack:
* ReactJS (main framework)
* React Bootstrap (UI components)
* axios (back-end access)
* Remarkable for commonmark processing/rendering (https://github.com/jonschlinkert/remarkable)

## Current state of affairs:

Available:
* Login to Olog-ES backend.
* Create logbooks and tags.
* Display log entry details, including image thumbnails, links to non-image attachments and properties.
* Create new log entry, including attachments and properties. Input is validated.
* Search criteria: list of logbooks, list of tags, time span, title, description, level and author.
* Properties search critieria.

Backlog:
* Log entry result set pagination, or other means to limit list of matching log records.
* UX tuning and styling overhaul.

## Toolchain

In order to develop and test with reasonable effort you will need the proper toolchain:

1) Node JS, install the latest version.
2) A text editor capable of syntax highlighting. Visual Studio Code is a good alternative as it comes with good support for React development. There are a numerous extensions for VS Code that may enhance the development experience even further.
3) Optional: a React JS add-on to your browser, which should probably be Chrome or Firefox.

## Get started

Install the toolchain and then:

1) Clone this project and cd to it.
2) Invoke ``npm install`` to download dependencies. The process may complain about various issues (e.g. missing git support on Mac, deprecated versions), but should result in a large number of modules being installed in the node_modules directory.
3) Create a ``.env`` file in the root directory. Add the line:
   ``REACT_APP_BASE_URL='url-to-Olog-ES-service'``.
4) Launch the Olog-ES backend. Or mock it.
5) Invoke ``npm start`` to launch the Node JS development server.
6) Develop.

## Unit tests

Unit test code can be added in file named like ``*.test.js``.
   
To run tests, invoke ``npm run test``.

## Deployment

In short, the toolchain is used to build/compile the artefacts subject to deployment, i.e. the files contained in the various React components must be compiled to JavaScript in order to be executable by a browser client. 

Detailed instructions will follow...




