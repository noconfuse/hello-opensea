const HDWalletProvider = require("@truffle/hdwallet-provider");
const  { OpenSeaPort, Network } = require('opensea-js');

const private_key = "";
const infura_project_id= "b048f1159fef4b2a85839313cff6aed8";
const wallet_address = "";
const offer_price = 0.001;
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

const getTokenId = (name)=>{
  const ethers = require('ethers');
  const utils = ethers.utils
  const lableArr = name.split('.')
  const labelHash = utils.keccak256(utils.toUtf8Bytes(lableArr[0]))
  const tokenId = new utils.BigNumber(labelHash).toString()
  return tokenId;
}


const makeOffer = async (tokenId, price)=>{
  return seaport.createBuyOrder({
    asset:{
      tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
      tokenId:tokenId
    },
    accountAddress:wallet_address,
    startAmount:price,
    expirationTime
  })
}

// const makeBundleOffer = (assets)=>{
//   seaport.createBundleBuyOrder({
//     assets,
//     accountAddress:wallet_address,
//     startAmount: price,
//     // Optional expiration time for the order, in Unix time (seconds):
//     expirationTime
//   }).then(res=>{
//     console.log(res)
//   }).catch(err=>{
//     console.log(err)
//   })
// }

// const get10000Assets = ()=>{
//   let assets = [];
//   for(let i=0;i<10;i++){
//     const domain = ("0000"+i).slice(-4);
//     const tokenId = getTokenId(domain);
//     console.log(`${domain}.eth`,`trokenId:${tokenId}`)
  
//     assets.push({
//       tokenId,
//       tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
//       name:`${domain}.eth`
//     })

//   }
//   return assets
// }


const sleep = (duration)=>{
  return new Promise(resolve=>{
    setTimeout(resolve,duration);
  })
}

async function main(){
  for(let i=0;i<1;i++){
    const domain = ("0000"+i).slice(-4);
    const tokenId = getTokenId(domain);
    console.log(`${domain}.eth`,`trokenId:${tokenId}`)
    await sleep(0)
    await makeOffer(tokenId,offer_price)
    .then(res=>{
      console.log(`第${i}个成功`,res)
    })
    .catch(err=>{
      console.log(err);
    }).finally(()=>{
      console.log(`第${i}个出错`);
    })
  }
  console.log("all done")
}

main()


