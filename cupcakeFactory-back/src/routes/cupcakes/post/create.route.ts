import { HTTPHandlerResponse, OnPost, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CUPCAKE_PAYLOAD, CUPCAKE_RESPONSE } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes',
    method: 'POST',
    config: {
        validate: {
            payload: CUPCAKE_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: CUPCAKE_RESPONSE
            }
        },
        description: 'Create one cupcake',
        notes: 'Create a new cupcake and returns it',
        tags: [ 'api', 'cupcake' ]
    }
})
export class PostCreateCupcakeRoute implements OnPost {
    /**
     * Class constructor
     * @param _cupcakesService
     * @param _logger
     */
    constructor(private _cupcakesService: CupcakesService, private _logger: LoggerService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._cupcakesService.create(request.payload).pipe(
            tap(_ => this._logger.info(_))
        );
    }
}
