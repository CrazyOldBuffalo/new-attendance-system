# University Attendance System #
***
## SAD Assignment 1 - Implementation ##
#### Submission by: Joshua Walley, Tomasz Boberek, Reuben St Ledger, Ollie Booth ####

***

### About: ###
This is a base application developed in React, Node.js & Express with the following frameworks used to facilitate the application:
- SCSS = for enhanced CSS styling, syntax, and debugging.
- Cypress = for use with testing.
- Bootstrap = for page styling and layouts.
- Mongoose = for DB modelling and connections.

It is created on the premise of the two main implemeented functionalities:
1. Adding, editing and deleting users from the register.
2. Generating attendance reports and markers on a particular student.

***

## Before running the application please follow the setup ##


1. Download the application to your chosen location.
2. Open the installation folder in a coding application or terminal.
3. Run `npm install` in both the `frontend` & `backend` folders separately
4. Install the community version of MongoDB server and compass here - [MongoDB Community](https://www.mongodb.com/try/download/community)  
or run mongoDB from the terminal ensuring it is on `localhost:27017`
5. Run `npm start` in both the `frontend` & `backend` folders in 2 seperate terminals
6. Use the application

***

## For running the Tests please follow these steps ##

1. Ensure cypress is installed by navigating to the `frontend` folder in terminal and typing in `npm install cypress`
2. Once installed type `npx cypress open` into the terminal within the `frontend` folder
3. Click on E2E testing
4. Click on any of the tests within to run
5. wait for the test to open in you preferred browser and complete.

***
## For populating the DB

1. Uncomment line 156 in `app.js` in the `backend`
2. Run once and the db should be populated.
3. If an issue occurs make sure to comment this line out before re-running the application

***
