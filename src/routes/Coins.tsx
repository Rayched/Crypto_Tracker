import styled from "styled-components";

const Title = styled.h2`
    color: ${(props) => props.theme.accentColor};
`;

function Coins(){
    return (
        <div>
            <Title>코인 목록</Title>
        </div>
    );
}

export default Coins;