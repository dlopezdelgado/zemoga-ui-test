# Zemoga UI Test

Author: Daniel López

This project has been divided in 3 main sections:
1. Layout HTML-CSS: Located in /layout folder
2. Interaction - JS: Located in root directory (Excepting /layout and /server directories)
3. NodeJS: Located in /server folder 

## 1. Layout HTML-CSS (Branch name: 'layout' or 'master')

### Instructions
1. Go to /layout folder, or switch to the branch named 'layout'
2. Open index.html file

### Technology and methodology used
- SASS precompiler.
- BEM methodology for order and modularity purposes.

## 2. Interaction - JS (Branch name: 'interaction' or 'master')

### Instructions
1. To start the Frontend side, open the console and run the following command at the root folder: 'npm start' or 'ng serve'.
2. To start the Backend side, open a new console and locate in the folder /server, then run the following command: 'npm run dev'. 
3. To see the app running in the browser, navigate to 'http://localhost:4200'

**NOTES** 
- It's necessary to run 'npm i' command in root folder and also in /server folder, in order to install all the dependencies for each project.
- You will need to start the backend side in order to be able to see the candidates and votes data.
- The backend side was developed in a high level way, just to get persistance in the data for candidates and votes. The only features that could be developed due the timeline were:
  - API's:
    - Login user with Json Web Token (JWT)
    - Renew token
    - Register users
    - List Candidates
    - Update candidate with new votes



### Technologies and methodologies used
- JS Framework: Angular 11.2.2.
- Typescript
- SASS/SCSS
- Unit Testing: Jasmine
- REDUX

### Store and State Management (REDUX)

- Store has been handled with REDUX library, using the following structure:
  - An app-store module has been created in order to centralize all the redux in a single module
  - Each store entity is created in separated folders into app-store folder as the following example:
    - candidates
      - actions
      - effects
      - handler: this feature handles all selectors and actions dispatchers for the entity in store
      - reducer
      - selectors

### Unit and Integration Testings

- TDD methodology was applied for most of the cases related to state management and bussiness logic.
- Run 'npm run test' in console to checkout the code coverage


## 3. NodeJS (Branch name: 'interaction' or 'master' in /server folder)

### Instructions
1. To start the Backend side, open a new console and locate in the folder /server, then run the following command: 'npm run dev' or 'npm start'. 
2. To test endpoints, open Postman and import a file called ZemogaTest.postman_collection.json, located on the '/server/_support' folder, on master branch. The urls for the endpoints are:
  - Get All Candidates:
    - URL: localhost:4000/api/candidates/
    - Method: GET
  - Update Candidate:
    - URL: localhost:4000/api/candidates/:id
    - Method: PUT
  - Create new user:
    - URL: localhost:4000/api/auth/new
    - Method: POST
  - Login User:
    - URL: localhost:4000/api/auth/
    - Method: POST
  - Renew Token:
    - URL: localhost:4000/api/auth/renew
    - Method: GET
    - Header Params: 'x-token'
3. The initial mock for candidates and votes data is on a file called candidates-data.json, located on the 'server/_support' folder, on master branch.

## Not Delivered Features

Some features weren't delivered because of the timeline, in order to develop them, I suggest the following advices:

### FrontEnd Features

1. Login/Signup Page
  - Use a modal box to show either login form or signup form as well. You can handle it with any UI library (Material, Bootstrap, etc), or do it from scratch.
  - Allow the option to Login/Signup using Google of Facebook accounts.
  - Create a guard service file to handle the access in order to allow logged in users to vote.

### Backend Features

## Refactor

Create a collections for votes with this structure:

  ```
  votes: {
    _id: string;
    userId: string;
    candidateId: string;
    positive: boolean;
    negative: boolean;
    date: Date;
  }
  ```

Currently, due the timeline, votes are being recorded within the candidates collection in a votes object array following this structure, that is the same as the response of all candidates:

  ```
  candidates: {
    _id: '123456';
    name: 'Test Candidate';
    ...
    votes [
      {
        positive: true,
        negative: false
      },
      {
        ...vote2
      },
      ...
    ]
  }
  ```

Having that said, the first thing I would do is to refactor the endpoint for getting all the candidates, in order to pull all the candidates votes from the created votes collection, and then add them to the candidate object as an array to fit in the response format for the front end side. 

Other thing to refactor is creating an endpoint to register the votes in votes collection. For now, it's recording the votes by adding them to the votes array in candidate object.

## 3 Votes per user

In the get all candidates API, add a boolean field called 'enableVote' for each candidate in the response. When checking the votes collection, count the votes that the logged in user has for each candidate, and if the total votes number is under the max allowed (3), then enbaleVote will be true, will be false otherwise. That way, in the frontend, system will know if user can vote for the candidate or not.

In the case of voting, the api to record the vote, system must first check if user has more than the max allowed votes (3) in order to allow the upcoming vote. If it's the last vote, system should record the vote, and send a response with an attribute that tells the frontend side to disable the voting for that candidate.


## Users CRUD operations

This feature is pretty straightforward, just need to add the endpoints to delete, update and list users. Creating users is working currently, but only with name, email and password fields, so it just needs to add the other fields and it's done. But in general terms, this is easy to do and quick, however, it would be nice to have a good architecture for handling that, as I suggest on the other backend suggestions section.

## API to show votes x user

Create an API to list all the votes, with the option to send a query param with the user id in order to filter.
In the front end side, create a component to show all the votes in a table (validate access privileges to it).


## Other Backend Suggestions

1. I strongly suggest to use some architecture pattern (CLEAN, Hexagonal, etc) in order to decouple all the business logic from other layers (libraries, database handling, etc). For Example:
  - Folders:
    - /database: Functions related to Database Access Object (DAO)
    - /repositories: Functions to communicate business logic (use cases) with database
    - /usecases: Functions to handle business logic
    - /helpers
    - ...
2. Use TypeScript to improve quality code (Use Interfaces, Strongly Typed, Readability, Predictability, etc.).
3. Use TDD as much as possible.

## E2E, Automation Tests

I suggest to install a new JS or TS project for automation tests, install Cucumber dependency in the project and Webdriver. Separate the project into:
- features files, which will contain the scenarios
- steps files, for all the JS coding for the features
- pages files, for handling all the HTML elements captures from the UI.
- data files, for storing test data
- utils files, to be used for helpers functions

Use BDD for at least one positive case scenario and one negative case scenario for each feature. I don't recommend to use BDD in all the cases unless you have the time and budget for it.
