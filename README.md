# Keeper App
A note taking website. This is a React project made with Nodejs Javascript and Postgres for a web design course to learn react.

<img width="1917" height="841" alt="Image" src="https://github.com/user-attachments/assets/734c1571-5564-48de-9a5f-c485280e5d0f" />

### To run
First open the directory in the terminal, then run:

```
npm i
```

Then move into the server directory of the project and run the same command above.

Create a database that holds the `title` and `content` of the notes that can be created and add serial `id` in postgresql.

After the `node_modules` are done downloading create a `.env` file to put necessary database information for the postgres database. 

```
PG_USER= # Your postgres username
PG_HOST= # Your postgres hostname
PG_DATABASE= # Your database's name
PG_PASSWORD= # Your postgres user password
PG_PORT= # Your postgres port number
```

return to projects main directory from the server directory and run the website.

```
cd ..
npm start
```

The website will start automatically and the page will open on the default browser.
