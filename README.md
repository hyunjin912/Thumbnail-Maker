# Thumbnail-Maker App

Unsplash API와 html2canvas를 이용해 블로그나 PPT 대표 사진에 사용할 이미지를 간단한 수정 및 저장할 수 있는 사이트입니다.

## 제작 동기

웹툰을 보고 있는 와중에 내용 전개가 이상한 것 같아서 의아한 적이 있습니다.
이유는 이미지가 다 불려오지 못했기 때문이었습니다.
이처럼 보여야 할 이미지가 아직 남아있는데 사용자는 눈치채지 못하는 상황을 개선하기 위한 방법을 찾다가 유튜브에서 사용한 기법을 이용하면 좋을 것 같아서 제작하였습니다.  

## 사용 기술

### Client

- **React**

  게임의 화면이 전환될 때 깜빡임이 없도록 SPA로 만들 필요가 있었고, Javascript 문법이 익숙하였기에 자체적인 문법이 있는 Vue, Angular보다는 React를 사용하였습니다. 또한 React의 사용자가 많으므로 개발하는 과정에서 생기는 문제들을 해결하기에 더욱 용이할 것으로 생각하였습니다.

- **Html2canvas**

  이미지를 Capture 하기 위해 사용하였습니다.

## 문제 해결

- 검색을 여러 번 했을 경우 브라우저는 history가 생성되는데, '뒤로 기기'나 '앞으로 가기'를 했을 때 URI의 Query Parameter와 일치하는 데이터를 보여주기 위해 history api의 state를 이용하였습니다.

## 배운 점

- redux, styled-components의 사용법

## Demo

[바로 가기](https://hyunjin912.github.io/p_thumbnail-maker)  

## 로컬 설치

git을 clone 한 후에 따라 해주세요.

```bash
# 모든 모듈 설치
npm i

# 리액트 3000포트 실행
npm start
```

## Screenshots
#### 메인
![메인](/public/screenshot-01.png)
#### 꾸미기
![꾸미기](/public/screenshot-02.png)
