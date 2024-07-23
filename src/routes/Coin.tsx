//Coin Detail Page

import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

//CSS setting
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

//Header's
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.accentColor};
`;

const Title = styled.h2`
    font-size: 30px;
    display: flex;
    align-items: center;
`;

const CoinImgs = styled.img`
    width: 30px; height: 30px;
    margin-right: 7px;
`;

const MainWrapper = styled.div``;

const Wrappers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 35px 0px;

    th {
        font-weight: bold;
    }
`;

//Coin_Info's
const Coin_Infos = styled(Wrappers)`
    th, td {
        text-align: center;
        padding: 3px;
        font-size: 18px;
        border: 2px solid white;
    }
`;

//Coin Price
const Coin_Price = styled(Wrappers)`
    th, td {
        text-align: center;
        padding: 3px;
        font-size: 18px;
        border: 2px solid white;
    }
`;

//Coin Desc
const Coin_Desc = styled(Wrappers)`
    flex-direction: column;

    div {
        padding: 3px;
        margin: 5px 0px;
        border: 2px solid white;
    }
`;

//Tabs (Nested routes)
const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0px;
    border: 2px solid white;
    border-radius: 10px;
    padding: 3px;
`;

const Tab = styled.div<{isActive: boolean}>`
    width: 100px;
    text-align: center;
    font-size: 18px;
    margin: 3px;
    padding: 7px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
    &:hover {
        background-color: rgba(100, 100, 100, 0.5);
    }
    a {
        display: block;
    }
`;

//Type Setting
interface RouteState {
    state: {name: string};
};

interface I_InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
};

interface I_PriceData {
    id : string;
    name : string;
    symbl: string;
    rank : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD : {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
};

function Coin(){
    const {coinID} = useParams();
    /*
        * 강의에서는 coinID의 type을 별도로 지정해야 했지만
        * react-router-dom v6 사용중이면 이럴 필요가 없다.
        * useParams()의 return 값이 string | undefined라는 것이
        * 이미 명시가 된 상태이기 때문이다.
        * url로 입력된 coinID를 parameter로 가져옴
    */

    //Loading 관련
    const [Loading, setLoading] = useState(true);
    const Location = useLocation();

    //Coin Data (Detail, Price)
    const [CoinInfo, setInfo] = useState<I_InfoData>();
    const [CoinPrice, setPrice] = useState<I_PriceData>();

    const PriceMatch = useMatch("/:coinID/price");
    const ChartMatch = useMatch("/:coinID/chart");

    useEffect(() => {
        (async () => {
            const InfoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)   
            ).json();
            const PriceData = await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
            ).json();
            setInfo(InfoData);
            setPrice(PriceData);
            setLoading(false);
        })();
    }, [coinID]);

    return (
        <Container>
            <Header>
                <Title>
                    <>
                        {
                            Loading ? null
                            : (
                                <CoinImgs src={`https://cryptocurrencyliveprices.com/img/${CoinInfo?.id? CoinInfo.id : Location?.pathname}.png`}/>
                            )
                        }
                        {
                            Location?.state? Location.state
                            : Loading ? "Loading..." : CoinInfo?.name
                        }
                    </>
                </Title>
            </Header>
            {
                Loading ? "Loading..."
                : (
                    <MainWrapper>
                <Coin_Infos>
                    <table>
                        <tr>
                            <th>Symbol</th>
                            <th>Rank</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>{CoinInfo?.symbol}</td>
                            <td>{CoinInfo?.rank}</td>
                            <td>{"$ " + CoinPrice?.quotes.USD.price.toFixed(2)}</td>
                        </tr>
                    </table>
                </Coin_Infos>
                <Coin_Price>
                    <table>
                        <tr>
                            <th>24h</th>
                            <th>24h</th>
                            <th>24h</th>
                            <th>24h</th>
                        </tr>
                        <tr>
                            <td>{CoinPrice?.quotes.USD.market_cap_change_24h + "%"}</td>
                            <td>{CoinPrice?.quotes.USD.percent_change_7d + "%"}</td>
                            <td>{CoinPrice?.quotes.USD.percent_change_30d + "%"}</td>
                            <td>{CoinPrice?.quotes.USD.percent_change_1y + "%"}</td>
                        </tr>
                    </table>
                </Coin_Price>
                <Coin_Desc>
                    <div>{CoinInfo?.description}</div>
                    <div>{CoinInfo?.first_data_at}</div>
                    <div>{CoinInfo?.last_data_at}</div>
                </Coin_Desc>
                <Tabs>
                    <Tab isActive={ChartMatch !== null}>
                        <Link to={`/${coinID}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={PriceMatch !== null}>
                        <Link to={`/${coinID}/price`}>Price</Link>
                    </Tab>
                </Tabs>
                <Routes>
                    <Route path="chart" element={<Chart />}/>
                    <Route path="price" element={<Price />}/>
                </Routes>
            </MainWrapper>
                )
            }
        </Container>
    );
}

export default Coin;