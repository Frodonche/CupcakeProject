/**
 * Copy / paste this into a mongodb client to initialize the database
 */

use cupcakesDB;

db.getCollection('cupcakes').insertMany([
  {
    "nom": "Cupcake 1",
    "composition": {
        "base": {
          "label": "banane",
          "src": "base_banane.png"
        },
        "glacage": {
          "label": "banane",
          "src": "glacage_banane.png"
        },
        "garniture": {
          "label": "cerise",
          "src": "cerise.png"
        },
        "topping": {
          "label": "stars",
          "src": "stars.png"
        }
    },
    "createur": "Moi"
  },
  {
    "nom": "Cupcake 2",
    "composition": {
      "base": {
        "label": "pomme",
        "src": "base_pomme.png"
      },
      "glacage":  {
        "label": "fraise",
        "src": "glacage_fraise.png"
      },
      "garniture": {
        "label": "fraise",
        "src": "fraise.png"
      },
      "topping": {
        "label": "coeurs",
        "src": "coeurs.png"
      }
    },
    "createur": "Elle"
  },
  {
    "nom": "Cupcake 3",
    "composition": {
      "base": {
        "label": "schtroumf",
        "src": "base_schtroumf.png"
      },
      "glacage": {
        "label": "barbe_a_papa",
        "src": "glacage_barbe_a_papa.png"
      },
      "garniture": {
        "label": "cerise",
        "src": "cerise.png"
      },
      "topping":  {
        "label": "spinkles",
        "src": "spinkles.png"
      }
    },
    "createur": "Lui"
  }
  ]);

db.getCollection('bases').insertMany([
  {
    "label": "banane",
    "src": "base_banane.png"
  },
  {
    "label": "barbe_a_papa",
    "src": "base_barbe_a_papa.png"
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


db.getCollection('glacages').insertMany([
  {
    "label": "banane",
    "src": "glacage_banane.png"
  },
  {
    "label": "barbe_a_papa",
    "src": "glacage_barbe_a_papa.png"
  },
  {
    "label": "base",
    "src": "glacage_base.png"
  },
  {
    "label": "chocolat",
    "src": "glacage_chocolat.png"
  },
  {
    "label": "fraise",
    "src": "glacage_fraise.png"
  },
  {
    "label": "pomme",
    "src": "glacage_pomme.png"
  },
  {
    "label": "schtroumf",
    "src": "glacage_schtroumf.png"
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
