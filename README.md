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
- http://localhost:3001/notebook (fetches all notebooks in db)
- http://localhost:3001/notebook/add (add a new notebook to db)
- http://localhost:3001/notebook/edit/:id (edits notebook)
- http://localhost:3001/notebook/delete/:id (deletes notebook)
