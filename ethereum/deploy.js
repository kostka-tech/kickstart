const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'put your wallet seed words here',
    'https://rinkeby.infura.io/v3/1f7d728e1427448f9ceebb95897ff821'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to address: ', result.options.address);
};
deploy();