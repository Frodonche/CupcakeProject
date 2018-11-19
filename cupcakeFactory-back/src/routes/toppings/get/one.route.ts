import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Topping } from '../../../interfaces';
import { ID_PARAMETER, COMPO_RESPONSE } from '../../../schemas';
import { ToppingsService } from '../../../services';

@Route({
    path: '/api/toppings/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: COMPO_RESPONSE
            }
        },
        description: 'Get one topping',
        notes: 'Returns one topping for the given id in path parameter',
        tags: [ 'api', 'toppings' ]
    }
})
export class GetOneToppingRoute implements OnGet {
    /**
     * Class constructor
     * @param _toppingsService
     * @param _logger
     */
    constructor(private _toppingsService: ToppingsService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Topping> {
        return this._toppingsService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
