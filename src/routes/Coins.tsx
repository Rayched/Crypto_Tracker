import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FetchCoins } from "../api";

//Main Home CSS Style
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    }
    &:hover {
        color: ${(props) => props.theme.accentColor};
        background-color: ${(props) => props.theme.accentBgColor};
    };
`;

const CoinImgs = styled.img`
    width: 30px; height: 30px;
    margin-right: 7px;
`;

const Title = styled.h2`
    color: ${(props) => props.theme.accentColor};
    font-size: 30px;
`;

//Coin Data's Type Setting
interface I_Coin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

function Coins(){
    /*
    const [coins, setCoins] = useState<CoinData[]>([]);
    const [Loading, setLoading] = useState(true);

    //Coin Data 가져오기
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 50));
            setLoading(false);
        })();
    }, []);*/
    const {isLoading, data: CoinData} = useQuery<I_Coin[]>(
        "AllCoin", FetchCoins, {select: (datas) => datas.slice(0, 50)}
    );
    /**
     * isLoading, data는 useQuery가 기본적으로 제공하는 변수라고 한다.
     * 변수 data의 이름을 CoinData로 바꾸고 싶어서
     * 아래와 같이 변경을 시도했더니 Error가 발생했다.
     * {isLoading, data} => {isLoading, CoinData}: Error
     * 
     * useQuery가 기본적으로 제공하는 변수 중에서
     * CoinData라는 이름의 변수가 없기 때문에 Error가 발생한 것이다.
     * 
     * 하지만 'data'라는 기본 변수를 그대로 사용하고 싶지는 않아서
     * 이름을 바꾸는 방법을 찾아봤는데
     * ES6 alias 이용해서 data라는 변수를 다른 이름으로 바꿀 수 있다고 한다
     * 아래와 같이 작성하니 Error가 발생하지 않는다.
     * {isLoading, data: CoinData}
     * 
     * 추가적으로 api 통해서 가져오는 coin data의 양이 많아서 그런지
     * 예전보다 로딩 속도가 더 늘어났고, 반응도 느려졌다.
     * 그대로 두면 많이 불편할 것 같아서
     * 개선할 방법을 찾아봤다. (강의 댓글창)
     * useQuery()의 세번째 매개변수로 option 설정할 수 있다고 한다.
     * 
     * 'select' queryFuntion이 반환하는 데이터 일부를 
     * 변환하고자 할 때 사용할 수 있는 option이라고 한다.
     * slice() 함수를 사용해서 queryFunction의 return 값인
     * coinData 중 0 ~ 50번까지만 취하였다.
     * 
     * 이를 통해서 메인 홈의 로딩 속도가 
     * 느려졌던 문제를 해결할 수 있었다.
     */

    console.log(isLoading, CoinData);
    return (
        <Container>
            <Header>
                <Title>코인 목록</Title>
            </Header>
            {
                isLoading ? 
                (
                    <div>
                        <h3>코인(암호화폐) 데이터를 가져오고 있습니다.</h3>
                        <h3>잠시만 기다려주세요...</h3>
                    </div>
                )
                : (
                    <CoinList>
                    {
                        CoinData?.map((coin) => 
                            <Coin key={coin.id}>
                                <Link to={`/${coin.id}`} state={coin.name}>
                                    <CoinImgs src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                                    {coin.name}
                                </Link>
                            </Coin>
                        )
                    }
                    </CoinList> 
                )
            }
        </Container>
    );
}

export default Coins;