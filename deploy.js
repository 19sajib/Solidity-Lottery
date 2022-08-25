const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')


const provider = new HDWalletProvider(
    'swamp under warfare adapt chat near dust reveal meadow pledge grass donate',
    'https://rinkeby.infura.io/v3/4a1cea10a92b4ff18630775de17d621a'
)

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface)
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

