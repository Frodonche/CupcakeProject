import { Biim } from '@hapiness/biim';
import { Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap} from 'rxjs/operators';
import { Garniture } from '../interfaces';
import { GarnituresDocumentService } from './garnitures-document.service';

@Injectable()
export class GarnituresService {
    /**
     * Class constructor
     */
    constructor(private _garnituresDocumentService: GarnituresDocumentService) {
    }

    /**
     * Returns all existing garnitures in the list
     *
     * @returns {Observable<Garniture[] | void>}
     */
    listAll(): Observable<Garniture[] | void> {
        return this._garnituresDocumentService.find();
    }

    /**
     * Returns one garniture of the list matching id in parameter
     *
     * @param {string} id of the garniture
     *
     * @returns {Observable<Garniture>}
     */
    one(id: string): Observable<Garniture> {
        return this._garnituresDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucune garniture avec l'id '${id}' trouve`))
                )
            );
    }
}
