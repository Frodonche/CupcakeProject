import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topping } from '../interfaces';
import { ToppingModel } from '../models/toppings';

@Injectable()
export class ToppingsDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, ToppingModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Topping[] or undefined
     *
     * @return {Observable<Topping[] | void>}
     */
    find(): Observable<Topping[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one topping of the list matching id in parameter
     *
     * @param {string} id of the topping in the db
     *
     * @return {Observable<Topping | void>}
     */
    findById(id: string): Observable<Topping | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }
}
