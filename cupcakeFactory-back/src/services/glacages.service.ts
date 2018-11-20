import { Biim } from '@hapiness/biim';
import { Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap} from 'rxjs/operators';
import { Glacage } from '../interfaces';
import { GlacagesDocumentService } from './glacages-document.service';

@Injectable()
export class GlacagesService {
    /**
     * Class constructor
     */
    constructor(private _glacagesDocumentService: GlacagesDocumentService) {
    }

    /**
     * Returns all existing glacages in the list
     *
     * @returns {Observable<Glacage[] | void>}
     */
    listAll(): Observable<Glacage[] | void> {
        return this._glacagesDocumentService.find();
    }

    /**
     * Returns one glacages of the list matching id in parameter
     *
     * @param {string} id of the glacages
     *
     * @returns {Observable<Glacage>}
     */
    one(id: string): Observable<Glacage> {
        return this._glacagesDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucun glacage avec l'id '${id}' trouve`))
                )
            );
    }
}
