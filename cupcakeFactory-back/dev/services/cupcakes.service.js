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
const biim_1 = require("@hapiness/biim");
const core_1 = require("@hapiness/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const cupcakes_document_service_1 = require("./cupcakes-document.service");
let CupcakesService = class CupcakesService {
    /**
     * Class constructor
     */
    constructor(_cupcakesDocumentService) {
        this._cupcakesDocumentService = _cupcakesDocumentService;
    }
    /**
     * Returns all existing cupcakes in the list
     *
     * @returns {Observable<Cupcake[] | void>}
     */
    listAll() {
        return this._cupcakesDocumentService.find();
    }
    /**
     * Returns randomly one cupcakes of the list
     *
     * @returns {Observable<Cupcake | void>}
     */
    random() {
        return this.listAll()
            .pipe(operators_1.map(_ => (!!_ && _.length > 0) ? _[Math.round(Math.random() * _.length)] : undefined));
    }
    /**
     * Returns one cupcakes of the list matching id in parameter
     *
     * @param {string} id of the cupcakes
     *
     * @returns {Observable<Cupcake>}
     */
    one(id) {
        return this._cupcakesDocumentService.findById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(_) :
            rxjs_1.throwError(biim_1.Biim.notFound(`Aucun cupcake avec l'id '${id}' trouve`))));
    }
    /**
     * Check if cupcake already exists and add it in cupcakes list
     *
     * @param cupcake to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(cupcake) {
        return this._addCupcake(cupcake)
            .pipe(operators_1.flatMap(_ => this._cupcakesDocumentService.create(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(biim_1.Biim.conflict(`Un cupcake avec le nom '${cupcake.nom}' existe deja`)) :
            rxjs_1.throwError(biim_1.Biim.preconditionFailed(e.message))), operators_1.map(_ => ({ response: _, statusCode: 201 })));
    }
    /**
     * Update a cupcake in cupcakes list
     *
     * @param {string} id of the cupcake to update
     * @param {Cupcake} cupcake data to update
     *
     * @returns {Observable<Cupcake>}
     */
    update(id, cupcake) {
        return this._cupcakesDocumentService.findByIdAndUpdate(id, cupcake)
            .pipe(operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(biim_1.Biim.conflict(`Un cupcake avec le nom '${cupcake.nom}' existe deja`)) :
            rxjs_1.throwError(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(_) :
            rxjs_1.throwError(biim_1.Biim.notFound(`Aucun cupcake avec l id '${id}' trouve`))));
    }
    /**
     * Deletes one cupcake in cupcakes list
     *
     * @param {string} id of the cupcake to delete
     *
     * @returns {Observable<void>}
     */
    delete(id) {
        return this._cupcakesDocumentService.findByIdAndRemove(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(biim_1.Biim.notFound(`Aucun cupcake avec l id '${id}' trouve`))));
    }
    /**
     * Add cupcake with good data in cupcakes list
     *
     * @param cupcake to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    _addCupcake(cupcake) {
        return rxjs_1.of(cupcake);
    }
};
CupcakesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cupcakes_document_service_1.CupcakesDocumentService])
], CupcakesService);
exports.CupcakesService = CupcakesService;
//# sourceMappingURL=cupcakes.service.js.map