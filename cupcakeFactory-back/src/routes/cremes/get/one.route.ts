import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Creme } from '../../../interfaces';
import { ID_PARAMETER, COMPO_RESPONSE } from '../../../schemas';
import { CremesService } from '../../../services';

@Route({
    path: '/api/cremes/{id}',
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
        description: 'Get one creme',
        notes: 'Returns one creme for the given id in path parameter',
        tags: [ 'api', 'cremes' ]
    }
})
export class GetOneCremeRoute implements OnGet {
    /**
     * Class constructor
     * @param _cremesService
     * @param _logger
     */
    constructor(private _cremesService: CremesService, private _logger: LoggerService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Creme> {
        return this._cremesService.one(request.params.id)
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
