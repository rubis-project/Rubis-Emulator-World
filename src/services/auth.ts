import axios from 'axios';
import WorldServer from '../server';

export default class AuthService {
    static async account(ticket: string): Promise<any> {
        return await axios.get(`${WorldServer.config.io.protocol}://${WorldServer.config.io.host}:${WorldServer.config.io.port}/account`, { params: { ticket: ticket } });
    }
}