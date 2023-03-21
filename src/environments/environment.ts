// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest vps remoto
  // apiUrl: "http://80.240.126.57/public/api",
  // apiUrlMedia: "http://80.240.126.57/public/img/",
  //local
  apiUrl: "http://localhost:8888/proyectos/backen-api-pagos-angel-vps/public/api",
  apiUrlMedia: "http://localhost:8888/proyectos/backen-api-pagos-angel-vps/storage/app/",
  //remoto
  // apiUrl: "https://svcbmf.org/backen-api-pagos-angel-vps-nuevo/public/api",
  // apiUrlMedia: "https://svcbmf.org/backen-api-pagos-angel-vps-nuevo/storage/app/",
  clientId: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
