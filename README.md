# Zemoga UI Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.2.
Author: Daniel López

## CSS

- System is using BEM methodology for order and modularity purposes
- SASS precompiler was used

## Store and State Management (REDUX)

- Store has been handled with REDUX library, using the following structure:
  - An app-store module has been created in order to centralize all the redux in a single module
  - Each store entity is created in separated folders into app-store folder as the following example:
    - candidates
      - actions
      - effects
      - handler: this feature handles all selectors and actions dispatchers for the entity in store
      - reducer
      - selectors

## Unit Testing

- TDD methodology was applied for most of the cases related to state management and bussiness logic.
- Run 'npm run test' in console to checkout the code coverage

