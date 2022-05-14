const HDWalletProvider = require("@truffle/hdwallet-provider");
const  { OpenSeaPort, Network } = require('opensea-js');

const private_key = "";
const infura_project_id= "b048f1159fef4b2a85839313cff6aed8";
const wallet_address = "";
const offer_price = 0.01;
const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 2) // 过期时间

const provider = new HDWalletProvider({
  privateKeys: [private_key],
  providerOrUrl: `wss://mainnet.infura.io/ws/v3/${infura_project_id}`,
  networkCheckTimeoutnetworkCheckTimeout: 10000,
  timeoutBlocks: 200
})

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: 'faeb5c87d0ab4d9eb0e84ea026c1b842'
})

for(let i=0;i<10000;i++){
  const domain = i+"0000";
  console.log(`${domain}.eth`);
  // 传入tokenId 和 price
  // makeOffer()
}

const makeOffer = (tokenId, price)=>{
  seaport.createBuyOrder({
    asset:{
      tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      tokenId:tokenId
    },
    accountAddress:wallet_address,
    startAmount:price,
    expirationTime
  }).then((offer)=>{
    console.log(offer)
  }).catch(err=>{
    console.log(err)
  })
}



