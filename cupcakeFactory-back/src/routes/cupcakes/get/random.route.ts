import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cupcake } from '../../../interfaces';
import { CUPCAKE_RESPONSE } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes/random',
    method: 'GET',
    config: {
        response: {
            status: {
                200: CUPCAKE_RESPONSE
            }
        },
        description: 'Get one cupcake randomly',
        notes: 'Returns one cupcake randomly or 204',
        tags: [ 'api', 'cupcakes' ]
    }
})
export class GetRandomCupcakeRoute implements OnGet {
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
    onGet(request: Request): Observable<Cupcake | void> {
        return this._cupcakesService.random()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
