### Task 1.1

Please, run the following command to check and test task 1.1.
```
npm install
npm run task1.1
npm run test
```

### Task 1.2

Please, run the following command to check task 1.2.
```
npm install
npm run task1.2
```

### Tasks 2.1 and 2.2

Please, run the following command to check tasks 2.1 and 2.2
```
npm install
npm run task2
```
- view all users: http://localhost:3000/users (GET) 
- create user: http://localhost:3000/users (POST). Request example is in assets/create-user.json
- view user: http://localhost:3000/users/1 (GET)
- update user: http://localhost:3000/users/1 (PUT)
- delete user: http://localhost:300/users/1 (DELETE). Peforms a soft delete, `isDeleted` = true.

### Tasks 3.1 and 3.2

Please install PostgreSQL, then create database `nodejs` and populate it with data.

```
npm install
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
npm install
npm run task3
```

### Tasks 4.1, 4.2 and 4.3

Please, run the following commands to check tasks 4.1, 4.2 and 4.3

```
npm install

# if database `nodejs` and `admin` user aren't created, please first follow instructions from Task #3

# populate database from files
psql -d nodejs --user=admin -W -f assets/create_users_table.sql
psql -d nodejs --user=admin -W -f assets/create_groups_table.sql
psql -d nodejs --user=admin -W -f assets/create_user_group_table.sql

# to check tasks #4.1, #4.2 and #4.3
npm run task4
```
- view all groups: http://localhost:3000/groups (GET) 
- create group: http://localhost:3000/groups (POST). Request example is in assets/create-group.json
- view group: http://localhost:3000/groups/1 (GET)
- update group: http://localhost:3000/groups/1 (PUT)
- delete group: http://localhost:3000/groups/1 (DELETE).
- add users to group: http://lolcahost:3000/groups/1 (POST). Request example in assets/add_users_to_group.json

### Tasks 5.1, 5.2 and 5.3

Please, run the following commands to check tasks 5.1, 5.2, 5.3

```
npm install
npm run task5
```
Navigate to page http://localhost:3000/users/1, then you should see in terminal message "Logged /users/1 GET -- date".
To check that errors appear in `error.log`, please pass incorrect params in methods:
- http://localhost:3000/groups/incorrect (GET)
- http://localhost:3000/users/xxx (GET)


### Tasks 6.1, 6.2

Please, run the following commands to check tasks 6.1 and 6.2

```
npm install
npm run task6
```

Make a request `assets/auth-user.json` to endpoint http://localhost:3000/login (POST) to get JWT-token. Copy the token and pass it in `x-access-token` for every request.

### Tasks 7.1, 7.2

Please, run the following commands to check tasks 7.1 and 7.2

```
npm install

# create a database for tests
createdb nodejs-test --owner=admin

# run all tests
npm run test

npm run task7
```