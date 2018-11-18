import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cupcake } from '../interfaces';
import { CupcakeModel } from '../models/cupcakes';

@Injectable()
export class CupcakesDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({ adapter: 'mongoose' }, CupcakeModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Cupcake[] or undefined
     *
     * @return {Observable<Cupcake[] | void>}
     */
    find(): Observable<Cupcake[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one cupcake of the list matching id in parameter
     *
     * @param {string} id of the cupcake in the db
     *
     * @return {Observable<Cupcake | void>}
     */
    findById(id: string): Observable<Cupcake | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Check if cupcake already exists with index and add it in cupcakes list
     *
     * @param {Cupcake} cupcake to create
     *
     * @return {Observable<Cupcake>}
     */
    create(cupcake: Cupcake): Observable<Cupcake> {
        return from(this._document.create(cupcake))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    /**
     * Update a cupcake in cupcakes list
     *
     * @param {string} id
     * @param {Cupcake} cupcake
     *
     * @return {Observable<Cupcake | void>}
     */
    findByIdAndUpdate(id: string, cupcake: Cupcake): Observable<Cupcake | void> {
        return from(this._document.findByIdAndUpdate(id, cupcake, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Delete a cupcake in cupcakes list
     *
     * @param {string} id
     *
     * @return {Observable<Cupcake | void>}
     */
    findByIdAndRemove(id: string): Observable<Cupcake | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }
}
