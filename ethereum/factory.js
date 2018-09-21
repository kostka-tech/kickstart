import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6f13aCc2699b7894FbF8d094B22b4AC229596559'
);

export default instance;

