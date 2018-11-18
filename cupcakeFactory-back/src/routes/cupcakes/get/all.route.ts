import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cupcake } from '../../../interfaces';
import { CUPCAKES_RESPONSE } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes',
    method: 'GET',
    config: {
        response: {
            status: {
                200: CUPCAKES_RESPONSE
            }
        },
        description: 'Get all cupcakes',
        notes: 'Returns an array of cupcakes or 204',
        tags: [ 'api', 'cupcakes' ]
    }
})
export class GetAllCupcakesRoute implements OnGet {
    /**
     * Class constructor
     * @param _cupcakesService
     * @param _logger
     */
    constructor(private _cupcakesService: CupcakesService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Cupcake[] | void> {
        return this._cupcakesService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
