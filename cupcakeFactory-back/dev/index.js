"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// * NOTE :: leave this until @hapiness/core will be migrated to rxjs v6 - This library is installed automatically
require("rxjs-compat");
const core_1 = require("@hapiness/core");
const logger_1 = require("@hapiness/logger");
const config_1 = require("@hapiness/config");
const mongo_1 = require("@hapiness/mongo");
const application_module_1 = require("./application.module");
// bootstrap application
core_1.Hapiness.bootstrap(application_module_1.ApplicationModule, [
    logger_1.LoggerExt,
    core_1.HttpServerExt.setConfig(config_1.Config.get('server')),
    mongo_1.MongoClientExt.setConfig({
        load: [
            {
                name: 'mongoose',
                config: config_1.Config.get('mongodb')
            }
        ]
    })
])
    .catch(err => console.log(err));
//# sourceMappingURL=index.js.map