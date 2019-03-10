## Introduction

This is an sample app to showcase some generic react components I created together with my colleague Arnaud. 

**Requirements:**

We had to create an administration interface for 20+ microservices.
For each microservice we had to create an independent SPA.
All applications have the same structure:
* List with pagination that can be filtered for the main entity of the microservice.
* CRUD operations for the main entity.
* Detail page with additional information displayed (fetched from other services)


**Approach:**

* We created a starter app / bootstrap app to get started quickly (main entity was named “data” in the code to keep it as simple as possible).
* We created generic components that could be adjusted with key props.


**Additional information**

The example app works mainly with fake fetches that deliver static data (for login/authentication and the main entity), as the microservices that this app is build for are not available. 
All CRUD actions will return the same initial data.

For fetching beers information I used the PUNK API: https://punkapi.com/

To detect the entered language in the text field of the "Add" form I used the language layer API: https://languagelayer.com/


## Get Started

`npm install`

`npm start`

visit `localhost:3000` in your browser

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

###  `Environment Variables`

In the .env file you can define the environment variables you want to use. Important note you have to add the prefix REACT_APP_ to every environment variable.

Examples:

`REACT_APP_ADMIN_URL=https://admin-develop.test.com`

If you want to obfuscate your variables you can add them to your start or build command:

`REACT_APP_URL=http://test.de npm run start`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
