import * as Joi from 'joi';


export const ID_PARAMETER = Joi.string().required();

export const CUPCAKE_PAYLOAD = Joi.object().keys({
    nom: Joi.string(),
    composition: Joi.object().keys({
        pate: Joi.string().required(),
        garniture: Joi.string(),
        glacage: Joi.string(),
        topping: Joi.string()
    }).required(),
    custom: Joi.boolean().required()
});

export const CUPCAKE_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    nom: Joi.reach(CUPCAKE_PAYLOAD, 'nom'),
    composition: Joi.reach(CUPCAKE_PAYLOAD, 'composition'),
    custom: Joi.reach(CUPCAKE_PAYLOAD, 'custom')
});

export const CUPCAKES_RESPONSE = Joi.array().items(
    CUPCAKE_RESPONSE
).unique().min(1);
