import {PublicKey,Transaction} from "@solana/web3.js"

export function getExplorerUrl(
    endpoint:string,
    viewTypeOrItemAdress:"inspector" |PublicKey | string,
    itemType = "adress"
){
    const getClusteUrlParam = ()=>{
        let cluster="";
        if(endpoint = "localnet"){
            cluster = `customer&customerUrl=${encodeURIComponent(
            "http://127.0.0.1:8899"
        )}`;
    } else if (endpoint === "http://api.devnet.solana.com"){
        cluster = "devnet";
    }
    return cluster ? `?cluster=${cluster}`:"";
    };
    return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAdress}${getClusteUrlParam()}`;

}