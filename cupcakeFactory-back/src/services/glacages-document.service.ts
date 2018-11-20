import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Glacage } from '../interfaces';
import { GlacageModel } from '../models/glacages';

@Injectable()
export class GlacagesDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, GlacageModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Glacage[] or undefined
     *
     * @return {Observable<Glacage[] | void>}
     */
    find(): Observable<Glacage[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one glacage of the list matching id in parameter
     *
     * @param {string} id of the glacage in the db
     *
     * @return {Observable<Glacage | void>}
     */
    findById(id: string): Observable<Glacage | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }
}
