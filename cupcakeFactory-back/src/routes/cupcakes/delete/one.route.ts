import { OnDelete, Request, Route } from '@hapiness/core';
import { Observable } from 'rxjs';
import { ID_PARAMETER } from '../../../schemas';
import { CupcakesService } from '../../../services';

@Route({
    path: '/api/cupcakes/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        description: 'Delete one cupcake',
        notes: 'Delete one cupcake for the given id in path parameter and returns 204',
        tags: [ 'api', 'cupcakes' ]
    }
})
export class DeleteOneCupcakeRoute implements OnDelete {
    /**
     * Class constructor
     * @param _cupcakesService
     */
    constructor(private _cupcakesService: CupcakesService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._cupcakesService.delete(request.params.id);
    }
}
