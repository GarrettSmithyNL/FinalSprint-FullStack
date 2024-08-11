# FinalSprint-FullStack
Final Sprint for Fullstack JS - Used electronics search engine that utilizes Postgres and Mongo databases 

### Created by; Garret Smith, Zach Ropson, and Rodney Stead

## Before installing!
You will need;
-   PG Admin4
-   MongoDB with compass  

## Installation


Follow these steps to set up locally:

### 1.  **Clone the repository from github:**
```
git clone https://github.com/GarrettSmithyNL/FinalSprint-FullStack.git
```
### 2. Install dependencies
```
npm install
```
### 3. Set up enviroment variables, create a .env file with the following;
```
PGUSER = "user here"
PGHOST = "host here"
PGDATABASE = BestKindElectronics
PGPASSWORD = password here
PGPORT= port here
PORT= 3000 (stays the same)
SESSION_SECRET = your session secret here
DEBUG = true (stays true)
MONGO_URI=mongodb://127.0.0.1:27017/
```

### 4. Open a terminal in your repository to create the Postgres and mongo database's with the following;
```
*** Postgres ***

1. while in the terminal enter the following command;

psql -U postgres

2. Once in PostgreSQL Shell, run;

CREATE DATABASE "BestKindElectronics";
\c BestKindElectronics

3. Navigate to the services/PG/DDL directory and run the following commands to create the tables and populate the Products table;

psql -U postgres -d BestKindElectronics -f Logs.CREATE_table.sql
psql -U postgres -d BestKindElectronics -f Products.CREATE.sql
psql -U postgres -d BestKindElectronics -f Products.insert.sql
psql -U postgres -d BestKindElectronics -f Users.CREATE.sql
--------------------------------------------------------------------

*** Mongo ***

1. Ensure Mongo is running on your PC

2. The connection will be handled by the MONGO_URL specified in your .env file.

3. Navigate to the test folder in Mongo and underneith it find the products and import the products.json file located in services\Mongo\DDL\Products.insert.json to populate the data base.
```

## After installing
Run the following tests
```
npm test
```
This command will run the following tests to make sure that the following things are working;
- PostgreSQL DB connection
- Mongo DB connection 
- Postgress CRUD operations 
- Mongo CRUD operations
- Login route
- That your .env file is correctly set up

## How to use
To run the server use the following command in terminal;
```
node index.js
```

## Steps in order to use search function;

###  1. You must first register, so you must enter
-   A user name
-   A email with a @anything.com
-   A password 
###  2. Login, Enter the following
-   Email address
-   Password
### After a successful login you will be brought back to the home page and you should see a Welcome, followed by your user name

### 3. Click on the Search at the top, this will bring you to the search bar. The search bar will query the two database's name and description fields from the product table and return each item with a (Mongo) or (PostgreSQL) to show which database it came from. Each result is a link to its own page and will display its details. You can also see in the url bar it wil;l show /postgres or /mongo followed by a /# to identify the id number that the product is in its respectiable database.


---
### Thank you to anyone who tries our project, we had alot of fun.
### enjoy !!!

