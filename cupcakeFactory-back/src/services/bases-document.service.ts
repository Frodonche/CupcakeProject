import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base } from '../interfaces';
import { BaseModel } from '../models/bases';

@Injectable()
export class BasesDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, BaseModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Base[] or undefined
     *
     * @return {Observable<Base[] | void>}
     */
    find(): Observable<Base[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one base of the list matching id in parameter
     *
     * @param {string} id of the base in the db
     *
     * @return {Observable<Base | void>}
     */
    findById(id: string): Observable<Base | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }
}
