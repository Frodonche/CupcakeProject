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
const logger_1 = require("@hapiness/logger");
const operators_1 = require("rxjs/operators");
const schemas_1 = require("../../../schemas");
const services_1 = require("../../../services");
let GetAllCupcakesRoute = class GetAllCupcakesRoute {
    /**
     * Class constructor
     * @param _cupcakesService
     * @param _logger
     */
    constructor(_cupcakesService, _logger) {
        this._cupcakesService = _cupcakesService;
        this._logger = _logger;
    }
    /**
     * OnGet implementation
     * @param request
     */
    onGet(request) {
        return this._cupcakesService.listAll()
            .pipe(operators_1.tap(_ => this._logger.info(_)));
    }
};
GetAllCupcakesRoute = __decorate([
    core_1.Route({
        path: '/api/cupcakes',
        method: 'GET',
        config: {
            response: {
                status: {
                    200: schemas_1.CUPCAKES_RESPONSE
                }
            },
            description: 'Get all cupcakes',
            notes: 'Returns an array of cupcakes or 204',
            tags: ['api', 'cupcakes']
        }
    }),
    __metadata("design:paramtypes", [services_1.CupcakesService, logger_1.LoggerService])
], GetAllCupcakesRoute);
exports.GetAllCupcakesRoute = GetAllCupcakesRoute;
//# sourceMappingURL=all.route.js.map