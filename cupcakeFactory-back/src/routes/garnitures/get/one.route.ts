import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Garniture } from '../../../interfaces';
import { ID_PARAMETER, COMPO_RESPONSE } from '../../../schemas';
import { GarnituresService } from '../../../services';

@Route({
    path: '/api/garnitures/{id}',
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
        description: 'Get one garniture',
        notes: 'Returns one garniture for the given id in path parameter',
        tags: [ 'api', 'garnitures' ]
    }
})
export class GetOneGarnitureRoute implements OnGet {
    /**
     * Class constructor
     * @param _garnituresService
     * @param _logger
     */
    constructor(private _garnituresService: GarnituresService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Garniture> {
        return this._garnituresService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
