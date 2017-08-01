// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCZ9XD0D0HSCngaYyZ0ovKTdE_jLu5Uxkg",
    authDomain: "e-health-app.firebaseapp.com",
    databaseURL: "https://e-health-app.firebaseio.com",
    projectId: "e-health-app",
    storageBucket: "e-health-app.appspot.com",
    messagingSenderId: "87995826896"
  }
};
