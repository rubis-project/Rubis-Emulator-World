import * as net from 'net';
import Basic from '../utils/basic';
import Logger from '../utils/logger';
import Handler from './handler';

export default class Session {
    socket: any;
    // key: string;
    state: number;
    logger: Logger;

    constructor(socket: net.Socket) {
        this.state = 0;
        // this.key = Basic.randomString(32);
        this.logger = new Logger('WorldSession(' + socket.remoteAddress + ':' + socket.remotePort + ')');
        this.socket = socket;

        socket.on('data', (data: string) => this.onData(data));
        socket.on('error', (err) => socket.destroy());
        socket.on('close', () => socket.end());

        this.send('HG');
    }

    onData(data: string): void {
        var packets: string[] = data.toString().replace('\x0a', '').split('\x00');
        for(var i in packets) {
            var packet: string = packets[i].trim();
            if(packet != '') {
                this.logger.debug('<<<<< ' + packet);
                this.handle(packet);
            }
        }
    }

    send(packet: string) : void {
        if(this.socket != undefined) {
            this.socket.write(packet + "\x00");
            this.logger.debug('>>>>> ' + packet);
        }
    }

    handle(packet: string) : void {
        switch(packet.charAt(0)) {
            case 'A':
                switch(packet.charAt(1)) {
                    case 'T':
                        Handler.handleAuthentificationTicket(this, packet);
                        break;

                    case 'P':
                        Handler.handleCharacterRandomName(this, packet);
                        break;

                    case 'L':
                        // Handler.handleCharacterRequestList(this, packet);
                        break;

                    case 'A':
                        Handler.handleCharacterCreation(this, packet);
                        break;

                    case 'D':
                        // Handler.handleCharacterDeletion(this, packet);
                        break;

                    case 'S':
                        // Handler.handleCharacterSelection(this, packet);
                        break;
                    
                    case 'G':
                        // Handler.handleGiveCharacterGift(this, packet);
                        break;

                    case 'R':
                        // Handler.handleReviveHeroicCharacter(this, packet);
                        break;
                    default:
                        this.logger.debug('<<<<< ' + packet);
                        break;
                }
                break;
            case 'G':
                switch(packet.charAt(1)) {
                    case 'C':
                        // Handler.handleRequestContext(this, packet);
                        break;
                    case 'I':
                        // Handler.handleRequestMap(this, packet);
                        break;
                    case 'A':
                        switch(packet.charAt(2)) {
                          case '0':
                            switch(packet.charAt(3)) {
                              case '0':
                                switch(packet.charAt(4)) {
                                  case '1':
                                    // Handler.handleRequestMapMove(this, packet);
                                    break;
                                }
                                break;
                            }
                            break;
                        }
                        break;
                }
                break;
            default:
                this.logger.debug('<<<<< ' + packet);
                break;
        }
    }
}