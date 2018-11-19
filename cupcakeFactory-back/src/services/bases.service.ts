import { Biim } from '@hapiness/biim';
import { Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap} from 'rxjs/operators';
import { Base } from '../interfaces';
import { BasesDocumentService } from './bases-document.service';

@Injectable()
export class BasesService {
    /**
     * Class constructor
     */
    constructor(private _basesDocumentService: BasesDocumentService) {
    }

    /**
     * Returns all existing bases in the list
     *
     * @returns {Observable<Base[] | void>}
     */
    listAll(): Observable<Base[] | void> {
        return this._basesDocumentService.find();
    }

    /**
     * Returns one cupcakes of the list matching id in parameter
     *
     * @param {string} id of the bases
     *
     * @returns {Observable<Base>}
     */
    one(id: string): Observable<Base> {
        return this._basesDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucune base avec l'id '${id}' trouve`))
                )
            );
    }
}
