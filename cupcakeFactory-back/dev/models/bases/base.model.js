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
var BaseModel_1;
const mongo_1 = require("@hapiness/mongo");
// import * as mongoose from 'mongoose';
let BaseModel = BaseModel_1 = class BaseModel extends mongo_1.Model {
    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(_mongoClientService) {
        // call parent constructor
        super(BaseModel_1);
        this._mongoClientService = _mongoClientService;
        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);
        // create schema
        this.schema = new dao.Schema({
            label: {
                type: String,
                required: true,
                trim: true
            },
            src: {
                type: String,
                required: true,
                trim: true
            }
        }, {
            versionKey: false
        });
        // implement virtual method toJSON to delete _id field and stringify all ObjectId field
        this.schema.set('toJSON', {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            }
        });
    }
};
BaseModel = BaseModel_1 = __decorate([
    mongo_1.MongoModel({
        adapter: 'mongoose',
        collection: 'bases'
    }),
    __metadata("design:paramtypes", [mongo_1.MongoClientService])
], BaseModel);
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.model.js.map