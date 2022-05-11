const   Web3 = require('web3')
const  { OpenSeaPort, Network } = require('opensea-js')


const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/49d77d7e91ce4747a8086f4ebbbe98b0`)

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: 'faeb5c87d0ab4d9eb0e84ea026c1b842'
})

const asset = {
  tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  tokenId:"108139716447050348910741088656393462735770136017145801888008682844778565891977"
}

const main  = async ()=>{
    const asset = await seaport.api.getAsset({
    tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", // string
    tokenId:"108139716447050348910741088656393462735770136017145801888008682844778565891977"
    })
    // console.log(asset);
    
}

const getBalance = async ()=>{
  const balance = await seaport.getAssetBalance({
    accountAddress:"0xFA9B690344696a8EC334bebBe269EF2729b40955",
    asset
  })
  console.log(balance.toNumber())
}

const makeOffer = async ()=>{
  const offer = await seaport.createBuyOrder({
    asset:{
      ...asset,
    },
    accountAddress:"0xDc36216742AE7d8a6c80a365713f89fbC74FfE1E",
    startAmount:0.01,
  })
  
}

// main()
// getBalance();
makeOffer()


