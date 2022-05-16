# JSON Web Token Authentication
REST APIs for users to register and login. Stored Passwords in hash and Implemented JWT for authentication so that a session is created.

## APIs

#### GET /register
To get a registeration page
#### POST /register
This will register a user if not registered. It requires username, password, name, college, yearofgraduation as input. Also the passwords are stored as hash in mongodb
#### GET /admin/users
Admin API to get all the users
#### PATCH /admin/update
Admin API to update details of a registered user
#### GET /login
If JWT session token not resent and if present and not expired then redirect to user page, else, redirect to login page.
#### POST /login
Check if the credentials are correct and create a JWT token with expiry of 1 day.
