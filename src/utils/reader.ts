export default class DReader {
    static getCharacterCreationData(packet: string): any {
        let data = packet.substring(2).split('|');
        return {
            name: data[0],
            breed: data[1],
            sex: data[2],
            color1: data[3],
            color2: data[4],
            color3: data[5]
        }
    }
}