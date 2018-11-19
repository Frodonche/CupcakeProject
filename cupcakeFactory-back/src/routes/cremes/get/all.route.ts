import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Creme } from '../../../interfaces';
import { COMPOS_RESPONSE } from '../../../schemas';
import { CremesService } from '../../../services';

@Route({
    path: '/api/cremes',
    method: 'GET',
    config: {
        response: {
            status: {
                200: COMPOS_RESPONSE
            }
        },
        description: 'Get all cremes',
        notes: 'Returns an array of cremes or 204',
        tags: [ 'api', 'cremes' ]
    }
})
export class GetAllCremesRoute implements OnGet {
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
    onGet(request: Request): Observable<Creme[] | void> {
        return this._cremesService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
