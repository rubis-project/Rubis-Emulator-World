import axios from 'axios';
import AuthService from '../services/auth';
import Basic from '../utils/basic';
import DReader from '../utils/reader';

export default class Handler {
    static handleAuthentificationTicket(session: any, packet: string) {
        session.logger.debug('WorldSession->handleAuthentificationTicket >>> ' + packet);
        let ticket = packet.substr(2);
        // let account: any = Managers.AuthManager.getTicket(ticket);
        let account: any = AuthService.account(ticket);
        account.then((data: any) => {
            session.account = data.data.data;
            session.logger.log(`Account "${session.account.username}" logged on worldserver`); 
            Handler.sendCharactersList(session);
        });
    }

    static sendCharactersList(session: any) {
        session.send('ALK-1|1;Jon;200;1010;;;;;0;1;0;0;0'); 
    //     let now = moment();
    //     let sub = moment(session.account.subscription, 'YYYY-MM-DD HH:mm:ss');
    //     let aboRest = sub.diff(now);
    //     if (aboRest < 0 ) {
    //         aboRest = 0;
    //     }

    //     let packet = 'ALK'+ aboRest + '|';
    //     Database.Character.getCharactersByAccountId(session.account.id, (characters) => {
    //         packet += characters.length;
    //         for(let i in characters){
    //             let c = characters[i];
    //             let s = Managers.ServerManager.getServerInformationById(c.serverId);
    //             // ALK[abo_time]|[total_character_counter]|[id];[name];[lvl];[gfxId];[color1];[color2];[color3];[accessories];[merchant];[serverID];[isDead];[deathCount];[lvlMax]
    //             if (s.enable && s.serverId === session.account.server) packet += `|${c.id};${c.name};${c.level};${c.gfxId};${c.color1};${c.color2};${c.color3};;0;${s.serverId};0;0;0`;
    //         }
    //         session.send(packet);
    //     });
    //     session.send(packet);
    }

    static handleCharacterRandomName(session: any, packet: any) {
        let name = Basic.randomString(Basic.randomNum(5, 9));
        name = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    
        session.send('APK' + name);
    }

    // static handleCharacterRequestList(session, packet) {
    //     Handler.World.sendCharactersList(session);
    // }

    static handleCharacterCreation(session: any, packet: any) {
        // let data = packet.substring(2).split('|');
        let data2 = DReader.getCharacterCreationData(packet);
        console.log('handleCharacterCreation', data2);
    //     let nw = {
    //         accountId: session.account.id,
    //         name: data[0],
    //         classId: parseInt(data[1]),
    //         sex: parseInt(data[2]),
    //         gfxId: parseInt(data[2]) >= 1 ? (parseInt(data[1]) * 10) + 1 : (parseInt(data[1]) * 10),
    //         color1: parseInt(data[3]),
    //         color2: parseInt(data[4]),
    //         color3: parseInt(data[5]),
    //         mapId: 10354,
    //         cellId: 255,
    //         direction: 1,
    //         level: 1,
    //         xp: 0,
    //         serverId:  Managers.ServerManager.getServerInformationByServerId(session.account.server).id
    //     };
    //     Database.Character.createCharacter(nw.accountId, nw.name, nw.classId, nw.sex, nw.gfxId, nw.color1, nw.color2, nw.color3, nw.mapId, nw.cellId, nw.direction, nw.level, nw.xp, nw.serverId, () => {
    //         Utils.Logger.global.log(`Character "${nw.name}" created by player "${session.account.username}" on server id "${nw.serverId}"`);
    //         World.sendCharactersList(session);
    //     });
    }

    // static handleCharacterDeletion(session, packet) {
    //     let id = parseInt(packet.substring(2).replace('|', ''));
    //     if (id > 0) {
    //         Database.Character.removeCharacter(id, () => {
    //             World.sendCharactersList(session);
    //         });
    //     } else {
    //         World.sendCharactersList(session);
    //     }
    // }

    // static handleCharacterSelection(session, packet) {
    //     let id = parseInt(packet.substring(2));
    //     if(id > 0) {
    //         Database.Character.getCharacterById(id, (c) => {
    //             if (c && c.accountId === session.account.id) {
    //                 session.player = new Network.World.Models.Player(session, c);
    //                 session.send(`ASK|${c.id}|${c.name}|${c.level}|${c.classId}|${c.guild||0}|${c.sex}|${c.gfxId}|${c.color1}|${c.color2}|${c.color3}|${c.items||`1~${(7043).toString(16)}~1~~;`}`);

    //                 session.send('BAP' + Definitions.deviceName);
    //                 console.log(`Character "${c.name}" spawn in world`);
    //             } else {
    //                 World.sendCharactersList(session);
    //             }
    //         });
    //     }
    // }

    // static handleGiveCharacterGift(session, packet) {
    //     let data = (packet.substr(2)).split('|');
    //     console.log('handleGiveCharacterGift', data);

    //     Database.Item.getItemById(data[0], (item) => {
    //         if (item) {
    //             console.log(item);
    //             session.send('AG')
    //         }
    //     })
    // }

    // static handleReviveHeroicCharacter(session, packet) {
    //     let characterId = packet.substr(2);
    //     // clear inventory, kamas, level
    //     // revive
    //     // ... another action
    //     console.log(`handleReviveHeroicCharacter:: revive character ${characterId}`);
    // }

    // static handleRequestContext(session, packet) {
    //     let context = parseInt(packet.substring(2));
    //     switch (context) {
    //         case 1:
    //             session.send('GCK|1|' + session.player.character.name);
    //             session.send('cC+*#$pi:?%');
    //             session.send('AR6bk');

    //             // xp,xpLow,xpHigh|kamas|caractPoints|spellPoints|alignId~alignId,alignData,alignId,alignHonour,alignDisgrace,alignEnabled|pdv,pdvmax|energy,energyMax,initiative,prospection
    //             session.send('As100,0,3000|100|99|101|~,,,,,|100,500|9999,10000|1000|120|6,0,0,0|3,0,0,0|500,10,0,101|101,0,0,0|101,0,0,0|101,0,0,0|101,0,0,0|101,0,0,0|3,0,0,0|3,0,0,0|10,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0');

    //             Database.Map.getMapById(session.player.character.mapId, (map) => {
    //                 if (map) {
    //                     session.send('GDM|'+ session.player.character.mapId + "|" + map.date + "|" + map.key);
    //                 }
    //             });

    //             if(session.player.state == 0){
    //                 session.player.motd();
    //             }
    //             break;
    //     }
    // }

    // static handleRequestMap(session, packet){
    //     session.send('GM|+'+ session.player.character.cellId + ";" + session.player.character.direction + ";"+ "0;" + session.player.character.id + ";" + session.player.character.name + ";" +
    //     session.player.character.classId + ";" + "61^100;" + session.player.character.sex + ";" + "-1;" + session.player.character.color1 + ";" + session.player.character.color2 + ";" +
    //     session.player.character.color3 + ";" + ";" + ";" + ";" + ";" + ";" + ";0;;");
    //     session.send('GDK');
    // }

    // static handleRequestMapMove(session, packet) {
    //     let chemin = packet.substr(5);
    //     let cryptCellId = Utils.Basic.cryptCellId(session.player.character.cellid);
    //     let trajet = "a" + cryptCellId + chemin;
    //     session.send("GA0;1;" + session.player.character.id + ";" + trajet);
    //     session.send('GKK0');
    //     let action = packet.substring(2, 5);
    //     session.send("GA" + action + ";1;" + trajet);
    // }
}