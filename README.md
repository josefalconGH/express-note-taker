# express-note-taker

## Description

The `express-note-taker` is a web application that allows users to write, save, and delete notes. It leverages Express.js for the backend, which serves static files and handles API requests for note management. Notes are persisted in a JSON file (db.json), making it easy to store and retrieve data without a database.

```md
express-note-taker
├── db/
│   └── db.json
├── public/
│   ├── assets/
│   │   ├── css/
│   │   └── js/
├── package-lock.json
├── package.json
└── server.js
```
### License

MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Write and save notes
- View previously saved notes
- Delete notes

## Mock-Up

The `express-note-taker` can be viewed at: https://github.com/josefalconGH/express-note-taker

### Demo

This application is deployed on Render.com and can be viewed [here](https://express-note-taker-d8zi.onrender.com/).

## Learning Outcomes

- Understanding the basics of building a web application with Express.js
- Implementing routes for serving static files and handling API requests
- Managing file I/O in Node.js for persisting data
- Implementing CRUD operations for managing data
- Deploying an Express.js application to a cloud platform

## Usage

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

4. Open a browser and navigate to `http://localhost:3050`

5. Write, save, and delete notes
