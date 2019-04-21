import axios from 'axios';

export default class AuthService {
    static async account(ticket: string): Promise<any> {
        return await axios.get('http://127.0.0.1:81/account', { params: { ticket: ticket, password: 'mySecretPassword' } });
    }
}