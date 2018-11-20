import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Glacage } from '../../../interfaces';
import { ID_PARAMETER, COMPO_RESPONSE } from '../../../schemas';
import { GlacagesService } from '../../../services';

@Route({
    path: '/api/glacages/{id}',
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
        description: 'Get one glacage',
        notes: 'Returns one glacage for the given id in path parameter',
        tags: [ 'api', 'glacages' ]
    }
})
export class GetOneGlacageRoute implements OnGet {
    /**
     * Class constructor
     * @param _glacagesService
     * @param _logger
     */
    constructor(private _glacagesService: GlacagesService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Glacage> {
        return this._glacagesService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
