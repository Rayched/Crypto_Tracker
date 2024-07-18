//Coin Detail Page

import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Title = styled.h2`
    color: ${(props) => props.theme.accentColor};
    font-size: 30px;
    display: flex;
    align-items: center;
`;

const CoinImgs = styled.img`
    width: 30px; height: 30px;
    margin-right: 7px;
`;

interface RouteState {
    state: {name: string};
};

function Coin(){
    const [Loading, setLoading] = useState(true);
    const Location = useLocation();

    const {coinID} = useParams();
    //강의에서는 coinID의 type을 별도로 지정해야 했지만
    //react-router-dom v6 사용중이면 이럴 필요가 없다.
    //useParams()의 return 값이 string | undefined라는 것이
    //이미 명시가 된 상태이기 때문이다.
    //url로 입력된 coinID를 parameter로 가져옴

    console.log(Location);

    return (
        <Container>
            <Header>
                <Title>
                    {
                        (Location.state === null)
                        ? "Loading..."
                        : (
                            <>
                                <CoinImgs src={`https://cryptocurrencyliveprices.com/img/${Location.pathname}.png`}/>
                                {Location.state}
                            </>
                        )
                    }
                </Title>
            </Header>
            {
                Loading ? <div>로딩 중...</div> : null
            }
        </Container>
    );
}

export default Coin;