### 사용한것

- Framer Motion, typescript, styled-components, react-query, react-router-dom, react-helmet

### 추가한부분

1. 디테일페이지 추가(기존에는 홈에 디테일페이지가 포함)
2. TV페이지 추가
3. 검색페이지 추가

### 개선사항

1. home, tv의 디테일페이지가 첫줄(상영중인...)만 호출(나머지는 빈 화면 호출)
   - home에 있는 detail을 분리 및 오버뷰 형태 -> 페이지이동으로 변경
2. detail의 배경사진이 없을경우 이전에 출력된 사진이 나옴(해결X)
   - 페이지가 이동되면 배경화면의 null로 초기화되도록 변경하려고 했으나 실패
3. tv -> detail 이동시 라우터가 tv에 계속 위치(헤더의 깃발이 tv에 계속 위치함)
   - detail의 위치를 tv/tvId -> tvs/tvId로 변경(임시해결)

### 배포사이트

https://yongchanson.github.io/React_8_NetflixClone/
