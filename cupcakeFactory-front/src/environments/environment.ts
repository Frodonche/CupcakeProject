// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '4443',
    endpoints: {
      allCupcakes: '/api/cupcakes',
      oneCupcakes: '/api/cupcakes/:id',
      allBases: '/api/bases',
      allGlacages: '/api/glacages',
      allToppings: '/api/toppings',
      allGarnitures: '/api/garnitures'
    }
  }};
