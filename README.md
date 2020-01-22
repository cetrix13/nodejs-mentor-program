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

### Task 2.1 and Task 2.2

Please, run the following command to check task 2.1 and task 2.2
```
npm run task2
```
- create user: http://localhost:3000/users (POST). Request example is in assets/create-user.json
- view user: http://localhost:3000/users/1 (GET)
- update user: http://localhost:3000/users/1 (PUT)
- delete user: http://localhost:300/users/1 (PUT). Set flag `isDeleted` to false.

### Task 3.1

Please install PostgreSQL, then create database `node_js` and populate it with data.

```
brew install postgresql
createdb node_js
psql -d node_js -f assets/create_users_table.sql
```

