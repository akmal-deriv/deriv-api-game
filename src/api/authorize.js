const DerivAPIBasic = require('@deriv/deriv-api/dist/DerivAPIBasic');

const api = new DerivAPIBasic({ endpoint: 'frontend.binaryws.com', lang: 'EN', app_id: 31635 });

export default async function getUserAuthorization(token) {
    return await api.authorize(token);
}
