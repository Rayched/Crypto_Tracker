
### `react query`

- Application의 데이터를 관리하고 동기화 하는데 사용하는 `Library`
- 상태 관리 라이브러리

```
React Query 사용하는 이유
1. 간편한 데이터 관리
- 데이터 가져오고, 캐싱, 동기화 및 업데이트 처리를 간편하게 할 수 있게 해준다.

2. 실시간 업데이트 및 동기화
- 실시간 데이터 업데이트 및 자동 동기화를 지원하여
  서버와 클라이어트 데이터의 일관성을 유지한다.
  
3. 데이터 캐싱
- 데이터를 캐싱하여 불필요한 API 요청을 줄이고
  애플리케이션의 성능을 향상시킨다.
  
4. 서버 상태 관리
- 로딩중, 에러, 성공 등의 서버 상태에 따른 관리를 간편하게 처리할 수 있다.
```

---

#### `react query` 설치 및 세팅

- `create-react-app` 통해서 `react project` 생성했다면 <br/>
	아래 명령어를 입력할 필요는 없다.

``` shell
npm install react-query
```

- `react-query` 설치를 완료했다면, `React App`에서 <br/>
	최상위 Component를 `<QueryClientProvider>`로 감싸줘야 한다.

``` tsx
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App(){
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App"></div>
		</QueryClientProvider>
	);
}
```

- `React Query` 사용하고자 하는 Component를 `<QueryClientProvider>` 감싸주고 <br/>
	앞에서 선언한 `QueryClient` 값을 `<QueryClientProvider>`의 `client`에 전달한다.

---
### \#\ 5.9 React Query

- 기존에는 Open API 통해서 Coin Data를 수동으로 가져오고 <br/>
	가져온 데이터를 화면에 띄우기 전까지 나오는 로딩 메시지까지 <br/>
	일일히 수동으로 작성했었다.

- `react-query` 사용하면, 이러한 일련의 과정들을 자동으로 처리해준다.
- 본격적으로 사용하기 전에 데이터를 가져오는 `fetcher` 함수를 만들어보자. <br/>
	(`API`와 관련된 코드들을 Component에서 분리하기 )

- `api.ts` 파일을 생성하고, `coin data` 가져오던 `api` 관련 코드를 이관하였다.<br/>
	(`FetchCoins` 함수에 `Logic` 이동) 

``` ts
//api.ts
export async function FetchCoins(){
	return fetch("https://api.coinpaprika.com/v1/coins").then(
		(resp) => resp.json();
	);
}
```

- `api` 통해서 `coin data` 가져오는 `Logic`을 별도의 함수로 이관했으니 <br/>
	이제 `coins.tsx`에서 이를 `import`해서 `coin data` 가져올 것이다.

``` tsx
function Coins(){
	//New
	const {isLoading, data} = useQuery<I_Coin[]>("AllCoin", FetchCoins);
	
	return (
		<div>...</div>
	);
}
```

- 기존의 `coins`, `Loading` 변수를 참조하던 코드 모두 `isLoading`, `data` 수정하였다.

---

### `useQuery()` 관련 issue

```
1. 변수 data의 이름을 'CoinData'로 변경하기
2. 메인 홈 로딩 속도 느려지는 이슈 해결하기
```


#### 1. 변수 `data`의 이름을 `CoinData` 변경하기

---

#### 2. 메인 홈 로딩 속도 느려지는 이슈 해결하기

---

