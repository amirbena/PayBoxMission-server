Hey To all,

First of all, put .env and .test.env file (please sure that the file is .dotenv)

* npm run build- build dist project.
* npm start- start the server


This is the requests of this project:

I assume that mission API passed quality check (only Auth Service is admited to pass him, and quality check made in this site)

* missions:

  - create Mission- created decrypted mission on DB- and encrypt it to client

  - get MISSONS - return all missions by array, encrypted to client
  - get specific Mission- 404 if mission not found , get mission  encrypted      to client 
  - update mission- 204 if user sent nothing to update, 404 if not found- otherwise, sent mission to client
  - delete 404 if not found- otherwise delete mission from db send encrypted data to client. 

  - 500 is error at most of MONGO DB

  
    