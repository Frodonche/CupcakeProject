/**
 * Copy / paste this into a mongodb client to initialize the database
 */

use cupcakesDB;

db.getCollection('cupcakes').insertMany([
  {
    "nom": "Cupcake 1",
    "composition": {
        "pate": "classique",
        "garniture": "pepites",
        "glacage": "chocolat"
    },
    "custom": false,
    "photo": "TODO"
  },
  {
    "nom": "Cupcake 2",
    "composition": {
      "pate": "tout choco",
      "garniture": "speculos",
      "glacage": "sucre"
    },
    "custom": false,
    "photo": "TODO"
  },
  {
    "nom": "Cupcake 3",
    "composition": {
      "pate": "classique",
      "garniture": "framboise",
      "glacage": "vanille"
    },
    "custom": false,
    "photo": "TODO"
  }
  ]);
