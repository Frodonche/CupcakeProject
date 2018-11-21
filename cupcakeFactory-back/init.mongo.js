/**
 * Copy / paste this into a mongodb client to initialize the database
 */

use cupcakesDB;

db.getCollection('cupcakes').insertMany([
  {
    "nom": "Cupcake 1",
    "composition": {
        "base": {
          "id": "5bf513c195c8e19281e4eda9",
          "label": "Banane",
          "src": "base_banane.png"
        },
        "glacage": {
          "id": "5bf513c195c8e19281e4edb0",
          "label": "Banane",
          "src": "glacage_banane.png"
        },
        "topping": {
          "id": "5bf513c295c8e19281e4edbb",
          "label": "Stars",
          "src": "stars.png"
        },
	      "garniture": {
          "id": "5bf513c295c8e19281e4edb8",
          "label": "Cerise",
          "src": "cerise.png"
        }
    },
    "createur": "Moi"
  },
  {
    "nom": "Cupcake 2",
    "composition": {
      "base": {
        "id": "5bf513c195c8e19281e4edae",
        "label": "Pomme",
        "src": "base_pomme.png"
      },
      "glacage":  {
        "id": "5bf513c195c8e19281e4edb4",
        "label": "Fraise",
        "src": "glacage_fraise.png"
      },
      "topping": {
        "id": "5bf513c295c8e19281e4edb9",
        "label": "Coeurs",
        "src": "coeurs.png"
      },
      "garniture": {
        "id": "5bf513c295c8e19281e4edb7",
        "label": "Fraise",
        "src": "fraise.png"
      }
    },
    "createur": "Elle"
  },
  {
    "nom": "Cupcake 3",
    "composition": {
      "base": {
        "id": "5bf513c195c8e19281e4edaf",
        "label": "Schtroumf",
        "src": "base_schtroumf.png"
      },
      "glacage": {
        "id": "5bf513c195c8e19281e4edb1",
        "label": "Barbe_a_papa",
        "src": "glacage_barbe_a_papa.png"
      },
      "topping":  {
        "id": "5bf513c295c8e19281e4edba",
        "label": "Spinkles",
        "src": "spinkles.png"
      },
     "garniture": {
       "id": "5bf513c295c8e19281e4edb8",
       "label": "Cerise",
        "src": "cerise.png"
      }
    },
    "createur": "Lui"
  }
  ]);

db.getCollection('bases').insertMany([
  {
    "label": "Banane",
    "src": "base_banane.png"
  },
  {
    "label": "Barbe a papa",
    "src": "base_barbe_a_papa.png"
  },
  {
    "label": "Base",
    "src": "base_base.png"
  },
  {
    "label": "Chocolat",
    "src": "base_chocolat.png"
  },
  {
    "label": "Fraise",
    "src": "base_fraise.png"
  },
  {
    "label": "Pomme",
    "src": "base_pomme.png"
  },
  {
    "label": "Schtroumf",
    "src": "base_schtroumf.png"
  }
]);


db.getCollection('glacages').insertMany([
  {
    "label": "Banane",
    "src": "glacage_banane.png"
  },
  {
    "label": "Barbe a papa",
    "src": "glacage_barbe_a_papa.png"
  },
  {
    "label": "Base",
    "src": "glacage_base.png"
  },
  {
    "label": "Chocolat",
    "src": "glacage_chocolat.png"
  },
  {
    "label": "Fraise",
    "src": "glacage_fraise.png"
  },
  {
    "label": "Pomme",
    "src": "glacage_pomme.png"
  },
  {
    "label": "Cchtroumf",
    "src": "glacage_schtroumf.png"
  }
]);

db.getCollection('garnitures').insertMany([
  {
    "label": "Fraise",
    "src": "fraise.png"
  },
  {
    "label": "Cerise",
    "src": "cerise.png"
  },
  {
    "label": "Sans",
    "src": "base.png"
  }
]);

db.getCollection('toppings').insertMany([
  {
    "label": "Coeurs",
    "src": "coeurs.png"
  },
  {
    "label": "Spinkles",
    "src": "spinkles.png"
  },
  {
    "label": "Stars",
    "src": "stars.png"
  },
  {
    "label": "Sans",
    "src": "base.png"
  }
]);
