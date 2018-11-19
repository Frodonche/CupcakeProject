import { Biim } from '@hapiness/biim';
import { Injectable } from '@hapiness/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap} from 'rxjs/operators';
import { Topping } from '../interfaces';
import { ToppingsDocumentService } from './toppings-document.service';

@Injectable()
export class ToppingsService {
    /**
     * Class constructor
     */
    constructor(private _toppingsDocumentService: ToppingsDocumentService) {
    }

    /**
     * Returns all existing toppings in the list
     *
     * @returns {Observable<Topping[] | void>}
     */
    listAll(): Observable<Topping[] | void> {
        return this._toppingsDocumentService.find();
    }

    /**
     * Returns one topping of the list matching id in parameter
     *
     * @param {string} id of the topping
     *
     * @returns {Observable<Topping>}
     */
    one(id: string): Observable<Topping> {
        return this._toppingsDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Aucun topping avec l'id '${id}' trouve`))
                )
            );
    }
}
