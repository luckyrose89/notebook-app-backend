# notebook-app-backend
Notebook app API based on MongoDB, Node and Express

## Available Scripts

To start server

```sh
$ node server.js
```
or
```sh
$ nodemon server
```

## API routes

- http://localhost:3001
- http://localhost:3001/notebook (fetches all notebooks in db - GET request)
- http://localhost:3001/notebook (add a new notebook to db - POST request)
- http://localhost:3001/notebook/:id (edits notebook - GET request)
- http://localhost:3001/notebook/:id (updates notebook - POST request)
- http://localhost:3001/notebook/:id (deletes notebook - DELETE request)
- http://localhost:3001/notebook/add/:id (add a new notepage to notebook - POST request)
- http://localhost:3001/notebook/:id/:noteid (finds the notebook with id and then the notepage with note id param - GET request)
- http://localhost:3001/notebook/:id/:noteid (updates a notepage with note id in notebook with the requested id - POST request)
- http://localhost:3001/notebook/delete/:id/:noteid (add a new notebook to db - GET request)
