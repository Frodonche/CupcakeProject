// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '9000',
    endpoints: {
      allCupcakes: '/api/cupcakes',
      randomCupcakes: '/api/cupcakes/random',
      oneCupcakes: '/api/cupcakes/:id',
      allPates: '/api/pates',
      allGlacages: '/api/glacages',
      allToppings: '/api/toppings',
      allGarnitures: '/api/garnitures'
    }
  }};
