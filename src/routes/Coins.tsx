import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
interface CoinData {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

function Coins(){
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
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인 목록</Title>
            </Header>
            {
                Loading ? 
                (
                    <div>
                        <h3>코인(암호화폐) 데이터를 가져오고 있습니다.</h3>
                        <h3>잠시만 기다려주세요...</h3>
                    </div>
                )
                : (
                    <CoinList>
                    {
                        coins.map((coin) => 
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