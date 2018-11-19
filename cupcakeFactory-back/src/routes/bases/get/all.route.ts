import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Base } from '../../../interfaces';
import { COMPOS_RESPONSE } from '../../../schemas';
import { BasesService } from '../../../services';

@Route({
    path: '/api/bases',
    method: 'GET',
    config: {
        response: {
            status: {
                200: COMPOS_RESPONSE
            }
        },
        description: 'Get all bases',
        notes: 'Returns an array of bases or 204',
        tags: [ 'api', 'bases' ]
    }
})
export class GetAllBasesRoute implements OnGet {
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
    onGet(request: Request): Observable<Base[] | void> {
        return this._basesService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
