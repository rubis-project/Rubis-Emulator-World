import Config from './utils/config';
import IConfig from './interfaces/iconfig';
import Logger from './utils/logger';
import Server from './network/server';
import DatabaseManager from './database/manager';
import * as io from 'socket.io-client';
import Definitions from './definitions';

export default class WorldServer {
    static config: IConfig;
    static server: any;
    static io: any;

    static initialize() {
        WorldServer.loadConfig();
        WorldServer.loadLogger();
        DatabaseManager.initialize(WorldServer.config.mysql);
        WorldServer.loadServer();
        WorldServer.io = io(`${WorldServer.config.io.protocol}://${WorldServer.config.io.host}:${WorldServer.config.io.port}`);
        WorldServer.io.emit('changeServerStatus', WorldServer.config.id, Definitions.SERVER.STATUS.ONLINE);
    }

    static start() {
        WorldServer.server.listen(WorldServer.config.host, WorldServer.config.port);
    }

    static loadConfig() {
        WorldServer.config = Config.load('./config.yml');
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