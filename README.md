## Crypto Tracker

- React Side Project
- 코인, 암호화폐의 가격을 보여주는 웹 사이트 구현하기

#### 💻 Use Stack's
- `TypeScript`, `React`
- `React Router ver6`, `react-query`, `styled-components`
- **[Coinpaprika api](https://coinpaprika.com/api/)**

---

### 2024.07.10 : route 작업

```
Crypto Tracker, Routing Setting

/ (Home)
- 모든 코인(암호화폐)에 대한 정보들을 보여주는 페이지

/:coinID
- 'coinID'와 일치하는 id를 가진 코인에 대한 상세 정보를 보여주는 페이지
- 예를 들어서 coinID가 'btc'라면 btc, bit coin에 대한 상세 정보를 보여준다.
```

---

### 2024.07.15 : style 작업
- 기존 styled-components는 개별 Component에만 style이 적용됐었다.
- styled-components의 `createGlobalStyle` 함수를 사용하면
- 프로젝트에서 전역적으로 적용될 CSS Style을 설정할 수 있다.

```
- CSS Reset Global Style로 적용
- 브라우저가 기본적으로 제공하는 CSS Style을 초기화하였음.
- 이후 외부 폰트를 설치, 배경색, 글자색을 수정하였다.
```
