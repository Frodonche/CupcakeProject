import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
// import * as mongoose from 'mongoose';

@MongoModel({
    adapter: 'mongoose',
    collection: 'cupcakes'
})
export class CupcakeModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(CupcakeModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            nom: {
                type: String,
                required: true,
                trim: true
            },
            composition: {
              pate: {
                type: String,
                required: true,
                trim: true
              },
              garniture: {
                type: String,
                trim: true
              },
              glacage: {
                type: String,
                trim: true
              },
              topping: {
                type: String,
                trim: true
              }
            },
            custom: {
              type: Boolean,
              required: true,
              trim: true
            },
            photo: {
              type: String,
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
            }
        );
    }
}
