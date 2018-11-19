import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
// import * as mongoose from 'mongoose';

@MongoModel({
    adapter: 'mongoose',
    collection: 'bases'
})
export class BaseModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(BaseModel);

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
            }
        );
    }
}
