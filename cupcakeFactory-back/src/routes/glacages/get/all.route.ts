import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Glacage } from '../../../interfaces';
import { COMPOS_RESPONSE } from '../../../schemas';
import { GlacagesService } from '../../../services';

@Route({
    path: '/api/glacages',
    method: 'GET',
    config: {
        response: {
            status: {
                200: COMPOS_RESPONSE
            }
        },
        description: 'Get all glacages',
        notes: 'Returns an array of glacages or 204',
        tags: [ 'api', 'glacages' ]
    }
})
export class GetAllGlacagesRoute implements OnGet {
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
    onGet(request: Request): Observable<Glacage[] | void> {
        return this._glacagesService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
