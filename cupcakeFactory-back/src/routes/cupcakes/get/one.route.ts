import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cupcake } from '../../../interfaces';
import { ID_PARAMETER, CUPCAKE_RESPONSE } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: CUPCAKE_RESPONSE
            }
        },
        description: 'Get one cupcake',
        notes: 'Returns one cupcake for the given id in path parameter',
        tags: [ 'api', 'cupcakes' ]
    }
})
export class GetOneCupcakeRoute implements OnGet {
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
    onGet(request: Request): Observable<Cupcake> {
        return this._cupcakesService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
