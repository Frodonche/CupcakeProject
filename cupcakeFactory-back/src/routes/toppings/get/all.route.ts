import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Topping } from '../../../interfaces';
import { COMPOS_RESPONSE } from '../../../schemas';
import { ToppingsService } from '../../../services';

@Route({
    path: '/api/toppings',
    method: 'GET',
    config: {
        response: {
            status: {
                200: COMPOS_RESPONSE
            }
        },
        description: 'Get all toppings',
        notes: 'Returns an array of toppings or 204',
        tags: [ 'api', 'toppings' ]
    }
})
export class GetAllToppingsRoute implements OnGet {
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
    onGet(request: Request): Observable<Topping[] | void> {
        return this._toppingsService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
