import { Config } from '@hapiness/config';
import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { MongoClientService, MongoModule } from '@hapiness/mongo';
import { SwagModule } from '@hapiness/swag';
import { Observable } from 'rxjs';
import { CupcakeModel, BaseModel, GlacageModel, GarnitureModel, ToppingModel } from './models';

import {
    DeleteOneCupcakeRoute,
    GetAllCupcakesRoute,
    GetOneCupcakeRoute,
    GetRandomCupcakeRoute,
    PostCreateCupcakeRoute,
    PutUpdateCupcakeRoute,
    GetAllGlacagesRoute,
    GetOneGlacageRoute,
    GetAllBasesRoute,
    GetOneBaseRoute,
    GetAllGarnituresRoute,
    GetOneGarnitureRoute,
    GetAllToppingsRoute,
    GetOneToppingRoute,
} from './routes';

import { CupcakesDocumentService, CupcakesService } from './services';
import{ BasesDocumentService, BasesService } from './services';
import { GlacagesDocumentService, GlacagesService } from './services';
import { GarnituresDocumentService, GarnituresService } from './services';
import { ToppingsDocumentService, ToppingsService } from './services';

// factory to declare dependency between CupcalesDocumentService and MongoClientService
// we use it to be sure that MongoClientService will be loaded before CupcakesDocumentService

const cupcakesDocumentServiceFactory = (mongoClientService: MongoClientService) => new CupcakesDocumentService(mongoClientService);
const basesDocumentServiceFactory = (mongoClientService: MongoClientService) => new BasesDocumentService(mongoClientService);
const glacagesDocumentServiceFactory = (mongoClientService: MongoClientService) => new GlacagesDocumentService(mongoClientService);
const garnituresDocumentServiceFactory = (mongoClientService: MongoClientService) => new GarnituresDocumentService(mongoClientService);
const toppingsDocumentServiceFactory = (mongoClientService: MongoClientService) => new ToppingsDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        GetAllCupcakesRoute,
        GetOneCupcakeRoute,
        GetRandomCupcakeRoute,
        PostCreateCupcakeRoute,
        PutUpdateCupcakeRoute,
        DeleteOneCupcakeRoute,
        CupcakeModel,
        GetAllBasesRoute,
        GetOneBaseRoute,
        BaseModel,
        GetAllGlacagesRoute,
        GetOneGlacageRoute,
        GlacageModel,
        GetAllGarnituresRoute,
        GetOneGarnitureRoute,
        GarnitureModel,
        GetAllToppingsRoute,
        GetOneToppingRoute,
        ToppingModel,
    ],
    providers: [
        HttpServerService,
        CupcakesService,
        { provide: CupcakesDocumentService, useFactory: cupcakesDocumentServiceFactory, deps: [ MongoClientService ] },
        BasesService,
        { provide: BasesDocumentService, useFactory: basesDocumentServiceFactory, deps: [ MongoClientService ] },
        GlacagesService,
        { provide: GlacagesDocumentService, useFactory: glacagesDocumentServiceFactory, deps: [ MongoClientService ] },
        GarnituresService,
        { provide: GarnituresDocumentService, useFactory: garnituresDocumentServiceFactory, deps: [ MongoClientService ] },
        ToppingsService,
        { provide: ToppingsDocumentService, useFactory: toppingsDocumentServiceFactory, deps: [ MongoClientService ] }
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param _httpServer
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
