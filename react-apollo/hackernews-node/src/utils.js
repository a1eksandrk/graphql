import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const APP_SECRET = 'GraphQL-hackernews'

const getTokenPayload = token => jwt.verify(token, APP_SECRET)

export const getUserId = (req, authToken) => {
    if (req) {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');

            if (!token) {
                throw new Error('No token found');
            }

            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('Not authenticated')
}
