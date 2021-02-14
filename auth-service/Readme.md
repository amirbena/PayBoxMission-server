Hey To all,

First of all, put .env and .test.env file (please sure that the file is .dotenv)

* npm run build- build dist project.
* npm start- start the server
This is the requests of this project:

* signup-create new user in system username&password and recieve token back and log for signup (if no have username&password- return 400 status). if username exists, return status 409

* signin- signin existing user into system username&password and recieve token back and log for sigin (if no have username&password- return 400 status). if username not exists, return status 404, and if password not correct, return 409.

* all logs- return all logs according user.

* missions:
    User MUST be Authenticated as Bearer Token, if not - return 401 status
  - create Mission- post request- encrypt mission send into body, save it and return encrypted mission -if key or value is empty, or not in type- return 400 status.

  - get MISSONS - return all missions by array
  - get specific Mission- 404 if mission not found , get mission by user sent it
  - update mission- 204 if user sent nothing to update, 404 if not found
  - delete 404 if not found- otherwise delete mission from db

  - 500 is error at most of MONGO DB

  
    