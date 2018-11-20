import * as Joi from 'joi';


export const ID_PARAMETER = Joi.string().required();

export const CUPCAKE_PAYLOAD = Joi.object().keys({
    nom: Joi.string(),
    composition: Joi.object().keys({
      base: Joi.object().keys({
        label: Joi.string(),
        src: Joi.string()
      }),
      glacage: Joi.object().keys({
        label: Joi.string(),
        src: Joi.string()
      }),
      topping: Joi.object().keys({
        label: Joi.string(),
        src: Joi.string()
      }),
      garniture: Joi.object().keys({
        label: Joi.string(),
        src: Joi.string()
      })
    }).required(),
    createur: Joi.string().required()
});

export const CUPCAKE_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    nom: Joi.reach(CUPCAKE_PAYLOAD, 'nom'),
    composition: Joi.reach(CUPCAKE_PAYLOAD, 'composition'),
    createur: Joi.reach(CUPCAKE_PAYLOAD, 'createur')
});

export const CUPCAKES_RESPONSE = Joi.array().items(
    CUPCAKE_RESPONSE
).unique().min(1);


export const COMPO_RESPONSE = Joi.object().keys({
  id: ID_PARAMETER,
  label: Joi.string().required(),
  src: Joi.string().required()
});

export const COMPOS_RESPONSE = Joi.array().items(
  COMPO_RESPONSE
).unique().min(1);
