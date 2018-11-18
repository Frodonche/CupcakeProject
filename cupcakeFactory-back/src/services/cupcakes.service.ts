import { Biim } from '@hapiness/biim';
import { HTTPHandlerResponse, Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Cupcake } from '../interfaces';
import { CupcakesDocumentService } from './cupcakes-document.service';

@Injectable()
export class CupcakesService {
    /**
     * Class constructor
     */
    constructor(private _cupcakesDocumentService: CupcakesDocumentService) {
    }

    /**
     * Returns all existing cupcakes in the list
     *
     * @returns {Observable<Cupcake[] | void>}
     */
    listAll(): Observable<Cupcake[] | void> {
        return this._cupcakesDocumentService.find();
    }

    /**
     * Returns randomly one cupcakes of the list
     *
     * @returns {Observable<Cupcake | void>}
     */
    random(): Observable<Cupcake | void> {
        return this.listAll()
            .pipe(
                map(_ => (!!_ && _.length > 0) ? _[ Math.round(Math.random() * _.length) ] : undefined)
            );
    }

    /**
     * Returns one cupcakes of the list matching id in parameter
     *
     * @param {string} id of the cupcakes
     *
     * @returns {Observable<Cupcake>}
     */
    one(id: string): Observable<Cupcake> {
        return this._cupcakesDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucun cupcake avec l'id '${id}' trouve`))
                )
            );
    }

    /**
     * Check if cupcake already exists and add it in cupcakes list
     *
     * @param cupcake to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(cupcake: Cupcake): Observable<HTTPHandlerResponse> {
        return this._addCupcake(cupcake)
            .pipe(
                flatMap(_ => this._cupcakesDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`Un cupcake avec le nom '${cupcake.nom}' existe deja`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a cupcake in cupcakes list
     *
     * @param {string} id of the cupcake to update
     * @param {Cupcake} cupcake data to update
     *
     * @returns {Observable<Cupcake>}
     */
    update(id: string, cupcake: Cupcake): Observable<Cupcake> {
        return this._cupcakesDocumentService.findByIdAndUpdate(id, cupcake)
            .pipe(
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`Un cupcake avec le nom '${cupcake.nom}' existe deja`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucun cupcake avec l id '${id}' trouve`))
                )
            );
    }

    /**
     * Deletes one cupcake in cupcakes list
     *
     * @param {string} id of the cupcake to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._cupcakesDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`Aucun cupcake avec l id '${id}' trouve`))
                )
            );
    }

    /**
     * Add cupcake with good data in cupcakes list
     *
     * @param cupcake to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addCupcake(cupcake: Cupcake): Observable<any> {
        return of(cupcake);
    }
}
