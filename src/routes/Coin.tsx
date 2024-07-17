import { useParams } from "react-router-dom";

function Coin(){
    const {coinID} = useParams();
    //강의에서는 coinID의 type을 별도로 지정해야 했지만
    //react-router-dom v6 사용중이면 이럴 필요가 없다.
    //useParams()의 return 값이 string | undefined라는 것이
    //이미 명시가 된 상태이기 때문이다.
    console.log(coinID);
    //url로 입력된 coinID를 parameter로 가져옴

    return (
        <div>
            <h4>coinID : {coinID}</h4>
        </div>
    );
}

export default Coin;