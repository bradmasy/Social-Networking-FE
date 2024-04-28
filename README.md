# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).





# SEVENS-SOCIAL-FRONT-END

## ADDING ELEMENTS TO THE PROJECT

### ADDING A COMPONENT
- make a new directory under <b>components</b> directory with the name of the component
- add a file for the component with a .tsx extension and a .scss for the component for the stylings
- in the .scss import the index.scss file from the global-styles directory to access variables and mixins etc
- export the component from the components directory index.tsx file to access globally

### ADDING A PAGE
- same process as component but under the <b>pages directory</b>


## DEPLOYMENT
- Deployments are done through heroku
- github actions is in the process of being configured but not set yet.

### TO BUILD MANUALLY FOR HEROKU

- heroku container:login
- docker build -t registry.heroku.com/sevens-social-fe/web . 
- docker push registry.heroku.com/sevens-social-fe/web 
- heroku container:release web --app sevens-social-fe 
   
