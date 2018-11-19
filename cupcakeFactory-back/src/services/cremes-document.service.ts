import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Creme } from '../interfaces';
import { CremeModel } from '../models/cremes';

@Injectable()
export class CremesDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, CremeModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Creme[] or undefined
     *
     * @return {Observable<Creme[] | void>}
     */
    find(): Observable<Creme[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one creme of the list matching id in parameter
     *
     * @param {string} id of the creme in the db
     *
     * @return {Observable<Creme | void>}
     */
    findById(id: string): Observable<Creme | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }
}
