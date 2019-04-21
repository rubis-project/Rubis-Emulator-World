import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import Logger from './utils/logger';
import Server from './network/server';
import DatabaseManager from './database/manager';

class WorldServer {
    static Config: IConfig;
    static server: any;

    static initialize() {
        WorldServer.loadConfig();
        WorldServer.loadLogger();
        DatabaseManager.initialize(WorldServer.Config.mysql);
        WorldServer.loadServer();
    }

    static start() {
        WorldServer.server.listen(WorldServer.Config.host, WorldServer.Config.port);
    }

    static loadConfig() {
        WorldServer.Config = Config.load('./config.yml');
    }

    static loadLogger() {
        Logger.global = new Logger('Global');
        Logger.global.log('Logger loaded');
    }

    static loadServer() {
        WorldServer.server = new Server();
    }
}

(() => {
    WorldServer.initialize();
    WorldServer.start();
})();