import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Base } from '../../../interfaces';
import { ID_PARAMETER, COMPO_RESPONSE } from '../../../schemas';
import { BasesService } from '../../../services';

@Route({
    path: '/api/bases/{id}',
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
        description: 'Get one base',
        notes: 'Returns one base for the given id in path parameter',
        tags: [ 'api', 'bases' ]
    }
})
export class GetOneBaseRoute implements OnGet {
    /**
     * Class constructor
     * @param _basesService
     * @param _logger
     */
    constructor(private _basesService: BasesService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Base> {
        return this._basesService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
