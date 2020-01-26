# Installation.

Please run the following command to install all dependencies
```
npm install
```

### Task 1.1

Please, run the following command to check and test task 1.1.
```
npm run task1.1
npm run test
```

### Task 1.2

Please, run the following command to check task 1.2.
```
npm run task1.2
```

### Tasks 2.1 and 2.2

Please, run the following command to check tasks 2.1 and 2.2
```
npm run task2
```
- create user: http://localhost:3000/users (POST). Request example is in assets/create-user.json
- view user: http://localhost:3000/users/1 (GET)
- update user: http://localhost:3000/users/1 (PUT)
- delete user: http://localhost:300/users/1 (PUT). Set flag `isDeleted` to true.

### Tasks 3.1 and 3.2

Please install PostgreSQL, then create database `nodejs` and populate it with data.

```
brew install postgresql

# start service and relaunch it at login
brew services start postgresql

# create a new user (login: admin, password: admin)
createuser --interactive --pwprompt

# create a new database
createdb nodejs --owner=admin

# populate database from a file
psql -d nodejs --user=admin -W -f assets/create_users_table.sql
```

Please, run the following command to check tasks 3.1 and 3.2
```
npm run task3
```
