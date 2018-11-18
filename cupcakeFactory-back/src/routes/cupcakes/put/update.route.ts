import { OnPut, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cupcake } from '../../../interfaces';
import { ID_PARAMETER, CUPCAKE_PAYLOAD, CUPCAKE_RESPONSE } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            },
            payload: CUPCAKE_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: CUPCAKE_RESPONSE
            }
        },
        description: 'Update one cupcake',
        notes: 'Update the cupcake for the given id in path parameter and returns it',
        tags: [ 'api', 'cupcake' ]
    }
})
export class PutUpdateCupcakeRoute implements OnPut {
    /**
     * Class constructor
     * @param _cupcakesService
     * @param _logger
     */
    constructor(private _cupcakesService: CupcakesService, private _logger: LoggerService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Cupcake> {
        return this._cupcakesService.update(request.params.id, request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
