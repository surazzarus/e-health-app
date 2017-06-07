// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAeecna5yWaZ1Kc5UUBTQSKzEBBlu0h6Lc",
    authDomain: "ng2-firebaseauth.firebaseapp.com",
    databaseURL: "https://ng2-firebaseauth.firebaseio.com",
    projectId: "ng2-firebaseauth",
    storageBucket: "ng2-firebaseauth.appspot.com",
    messagingSenderId: "785173058498"
  }
};
