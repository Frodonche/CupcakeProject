import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Garniture } from '../interfaces';
import { GarnitureModel } from '../models/garnitures';

@Injectable()
export class GarnituresDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, GarnitureModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Garniture[] or undefined
     *
     * @return {Observable<Garniture[] | void>}
     */
    find(): Observable<Garniture[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one garniture of the list matching id in parameter
     *
     * @param {string} id of the garniture in the db
     *
     * @return {Observable<Garniture | void>}
     */
    findById(id: string): Observable<Garniture | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }
}
