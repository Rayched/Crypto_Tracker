
const Based_URL = "https://api.coinpaprika.com/v1";

export function FetchCoins(){
    //coins.tsx
    /* Before
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();

    return json;*/
    /*
     * api와 관련된 코드를 FetchCoins 함수로 이관하면서
     * 기존 로직을 조금 손봤다.
     * await가 두번이나 쓰이던 코드를 
     * promise 객체를 통해서 간략화를 하였다.
    */
    return fetch(`${Based_URL}/coins`).then(
        (resp) => resp.json()
    );
}

//coin.tsx
//Coin Detail Information
export function fetchCoinInfo(coinID: string|undefined){
    return fetch(`${Based_URL}/coins/${coinID}`).then(
        (resp) => resp.json()
    );
};

//Coin Tickers (코인 시세)
export function fetchCoinTickers(coinID: string|undefined){
    return fetch(`${Based_URL}/tickers/${coinID}`).then(
        (resp) => resp.json()
    );
}