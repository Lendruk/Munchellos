import generator from 'generate-password';
import Token from '../models/Token';

export const buildToken = (userId : string) => {
    const token = generator.generateMultiple(2, { length: 30, numbers: true }).toString().replace(',','.');

    return new Token({ user: userId, authToken: token }).save();
}