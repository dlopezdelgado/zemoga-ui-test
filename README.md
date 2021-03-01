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

### Unit Testing

- TDD methodology was applied for most of the cases related to state management and bussiness logic.
- Run 'npm run test' in console to checkout the code coverage
