"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.ID_PARAMETER = Joi.string().required();
exports.CUPCAKE_PAYLOAD = Joi.object().keys({
    nom: Joi.string(),
    composition: Joi.object().keys({
        pate: Joi.string().required(),
        garniture: Joi.string(),
        glacage: Joi.string(),
        topping: Joi.string()
    }).required(),
    custom: Joi.boolean().required(),
    photo: Joi.string(),
});
exports.CUPCAKE_RESPONSE = Joi.object().keys({
    id: exports.ID_PARAMETER,
    nom: Joi.reach(exports.CUPCAKE_PAYLOAD, 'nom'),
    composition: Joi.reach(exports.CUPCAKE_PAYLOAD, 'composition'),
    custom: Joi.reach(exports.CUPCAKE_PAYLOAD, 'custom'),
    photo: Joi.reach(exports.CUPCAKE_PAYLOAD, 'photo')
});
exports.CUPCAKES_RESPONSE = Joi.array().items(exports.CUPCAKE_RESPONSE).unique().min(1);
//# sourceMappingURL=index.js.map