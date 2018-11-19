import { OnGet, Request, Route } from '@hapiness/core';
import { LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Garniture } from '../../../interfaces';
import { COMPOS_RESPONSE } from '../../../schemas';
import { GarnituresService } from '../../../services';

@Route({
    path: '/api/garnitures',
    method: 'GET',
    config: {
        response: {
            status: {
                200: COMPOS_RESPONSE
            }
        },
        description: 'Get all garnitures',
        notes: 'Returns an array of garnitures or 204',
        tags: [ 'api', 'garnitures' ]
    }
})
export class GetAllGarnituresRoute implements OnGet {
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
    onGet(request: Request): Observable<Garniture[] | void> {
        return this._garnituresService.listAll()
            .pipe(
                tap(_ => this._logger.info(_))
            );
    }
}
