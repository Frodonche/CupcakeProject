"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@hapiness/core");
const schemas_1 = require("../../../schemas");
const services_1 = require("../../../services");
let DeleteOneCupcakeRoute = class DeleteOneCupcakeRoute {
    /**
     * Class constructor
     * @param _cupcakesService
     */
    constructor(_cupcakesService) {
        this._cupcakesService = _cupcakesService;
    }
    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request) {
        return this._cupcakesService.delete(request.params.id);
    }
};
DeleteOneCupcakeRoute = __decorate([
    core_1.Route({
        path: '/api/cupcakes/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: {
                    id: schemas_1.ID_PARAMETER
                }
            },
            description: 'Delete one cupcake',
            notes: 'Delete one cupcake for the given id in path parameter and returns 204',
            tags: ['api', 'cupcakes']
        }
    }),
    __metadata("design:paramtypes", [services_1.CupcakesService])
], DeleteOneCupcakeRoute);
exports.DeleteOneCupcakeRoute = DeleteOneCupcakeRoute;
//# sourceMappingURL=one.route.js.map