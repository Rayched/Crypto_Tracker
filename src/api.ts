
export async function FetchCoins(){
    /* Before
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();

    return json;*/

    //간략화, await가 두 번이나 쓰여서 불편하다...
    return fetch("https://api.coinpaprika.com/v1/coins").then((resp) => 
        resp.json()
    );
}