"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.ID_PARAMETER = Joi.string().required();
exports.CUPCAKE_PAYLOAD = Joi.object().keys({
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
exports.CUPCAKE_RESPONSE = Joi.object().keys({
    id: exports.ID_PARAMETER,
    nom: Joi.reach(exports.CUPCAKE_PAYLOAD, 'nom'),
    composition: Joi.reach(exports.CUPCAKE_PAYLOAD, 'composition'),
    createur: Joi.reach(exports.CUPCAKE_PAYLOAD, 'createur')
});
exports.CUPCAKES_RESPONSE = Joi.array().items(exports.CUPCAKE_RESPONSE).unique().min(1);
exports.COMPO_RESPONSE = Joi.object().keys({
    id: exports.ID_PARAMETER,
    label: Joi.string().required(),
    src: Joi.string().required()
});
exports.COMPOS_RESPONSE = Joi.array().items(exports.COMPO_RESPONSE).unique().min(1);
//# sourceMappingURL=index.js.map