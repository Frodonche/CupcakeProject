import { Biim } from '@hapiness/biim';
import { Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap} from 'rxjs/operators';
import { Creme } from '../interfaces';
import { CremesDocumentService } from './cremes-document.service';

@Injectable()
export class CremesService {
    /**
     * Class constructor
     */
    constructor(private _cremesDocumentService: CremesDocumentService) {
    }

    /**
     * Returns all existing cremes in the list
     *
     * @returns {Observable<Creme[] | void>}
     */
    listAll(): Observable<Creme[] | void> {
        return this._cremesDocumentService.find();
    }

    /**
     * Returns one cremes of the list matching id in parameter
     *
     * @param {string} id of the cremes
     *
     * @returns {Observable<Creme>}
     */
    one(id: string): Observable<Creme> {
        return this._cremesDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucune creme avec l'id '${id}' trouve`))
                )
            );
    }
}
