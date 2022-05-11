const   Web3 = require('web3')
const  { OpenSeaPort, Network } = require('opensea-js')
const axios  = require("axios")


const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io`)

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: 'faeb5c87d0ab4d9eb0e84ea026c1b842'
})

const main  = async ()=>{
    const asset = await seaport.api.getAsset({
    tokenAddress:"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", // string
    tokenId:"108139716447050348910741088656393462735770136017145801888008682844778565891977"
    })
    console.log(asset)
    // axios.get("https://api.opensea.io/api/v1/asset/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/108139716447050348910741088656393462735770136017145801888008682844778565891977/").then(res=>{
    //     console.log(res.data)
    // })
}

main()

