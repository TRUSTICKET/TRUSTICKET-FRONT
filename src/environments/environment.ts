// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverURL: 'http://localhost:8000',
  apiHost: `http://localhost:8000`,  //
  clientHost: '172.30.1.22:4200', //클라이언트 서버 주소
  clientSecret: '27418175-4c00-42da-85ec-c1bc70cff130'  
  //clientSecret: '3bbfbd01-f227-4fc9-bfe0-30ca85e98b2a'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
