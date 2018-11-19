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
const bases_document_service_1 = require("./bases-document.service");
let BasesService = class BasesService {
    /**
     * Class constructor
     */
    constructor(_basesDocumentService) {
        this._basesDocumentService = _basesDocumentService;
    }
    /**
     * Returns all existing bases in the list
     *
     * @returns {Observable<Base[] | void>}
     */
    listAll() {
        return this._basesDocumentService.find();
    }
    /**
     * Returns one cupcakes of the list matching id in parameter
     *
     * @param {string} id of the bases
     *
     * @returns {Observable<Base>}
     */
    one(id) {
        return this._basesDocumentService.findById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(_) :
            rxjs_1.throwError(biim_1.Biim.notFound(`Aucune base avec l'id '${id}' trouve`))));
    }
};
BasesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [bases_document_service_1.BasesDocumentService])
], BasesService);
exports.BasesService = BasesService;
//# sourceMappingURL=bases.service.js.map