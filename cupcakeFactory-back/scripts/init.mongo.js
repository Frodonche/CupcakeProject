/**
 * Copy / paste this into a mongodb client to initialize the database
 */

use cupcakesDB;

db.getCollection('cupcakes').insertMany([
  {
    "nom": "Cupcake 1",
    "composition": {
        "base": "classique",
        "creme": "pepites",
        "garniture": "chocolat",
        "topping": "smarties"
    },
    "custom": false
  },
  {
    "nom": "Cupcake 2",
    "composition": {
      "base": "tout choco",
      "creme": "speculos",
      "garniture": "sucre",
      "topping": "vermicelles"
    },
    "custom": false
  },
  {
    "nom": "Cupcake 3",
    "composition": {
      "base": "classique",
      "creme": "framboise",
      "garniture": "vanille",
      "topping": "tagada"
    },
    "custom": false
  }
  ]);

db.getCollection('bases').insertMany([
  {
    "label": "banane",
    "src": "base_banane.png"
  },
  {
    "label": "barbe_a_papa",
    "src": "base_barbe_à_papa.png"
  },
  {
    "label": "base",
    "src": "base_base.png"
  },
  {
    "label": "chocolat",
    "src": "base_chocolat.png"
  },
  {
    "label": "fraise",
    "src": "base_fraise.png"
  },
  {
    "label": "pomme",
    "src": "base_pomme.png"
  },
  {
    "label": "schtroumf",
    "src": "base_schtroumf.png"
  }
]);


db.getCollection('cremes').insertMany([
  {
    "label": "banane",
    "src": "creme_banane.png"
  },
  {
    "label": "barbe_a_papa",
    "src": "creme_barbe_à_papa.png"
  },
  {
    "label": "base",
    "src": "creme_base.png"
  },
  {
    "label": "chocolat",
    "src": "creme_chocolat.png"
  },
  {
    "label": "fraise",
    "src": "creme_fraise.png"
  },
  {
    "label": "pomme",
    "src": "creme_pomme.png"
  },
  {
    "label": "schtroumf",
    "src": "creme_schtroumf.png"
  }
]);

db.getCollection('garnitures').insertMany([
  {
    "label": "fraise",
    "src": "fraise.png"
  },
  {
    "label": "cerise",
    "src": "cerise.png"
  }
]);

db.getCollection('toppings').insertMany([
  {
    "label": "coeurs",
    "src": "coeurs.png"
  },
  {
    "label": "spinkles",
    "src": "spinkles.png"
  },
  {
    "label": "stars",
    "src": "stars.png"
  }
]);
