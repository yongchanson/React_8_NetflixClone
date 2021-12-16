# React toDoList

  - CreateCategory 개선하고 싶은 부분
    - 추가한 카테고리가 로컬스토리지에 남아 있으나 새로고침하면 나오지 않음
    - 동일한 이름의 카테고리를 만들 수 있음

  - 오류수정  
    - git pull --rebase origin master : Commit 이력을 한줄로 깔끔하게 관리
    - git rebase --continue : 수정사항 적용
    - git rebase --abort : 수정사항 되돌리기

### React Hook Form
  
- form과 input을 쉽게 만들고 관리해준다.
- useForm을 이용하면 다양한 메서드를 가져와 사용할 수 있다.
- `register()`
  - input에 등록하는 함수(input에 필요한 모든속성을 가진다.)
  - `{...register("input type명")}`를 통해 input의 type, 속성을 지정할 수 있다.
- `watch()`
  -register을 사용한 모든 input의 변경사항 확인이 가능하다.(onChange이벤트와 역할이 비슷)
- `handleSubmit`
  - `handleSubmit(onValid, onInValid)`
  - onValid : 성공 시 실행될 함수
  - onValid함수 인자로 input에 입력한 값을 객체로 받아올 수 있다. `const Valid = ({ toDo }: IForm) => {}`
  - shouldFocus : form안 submit시 -> 오류난 input에 focus시켜주는 기능
- `setValue`
  - setValue("email","")를 통해 form을 submit 후, input의 값을 ""로 비워줄 수 있다.
 
- 5.11
  - atom값에 접근하기 위해선 useRecoilValue함수 사용 / useRecoilValue(atom)

  - useRecoilValue : value만 불러올때
  - useSetRecoiltState : value를 바꾸고 싶을때
  - useRecoilState : 둘다 얻고 싶을때

- 5.14
  - 불변성(immutability)을 추구 + mutata를 하고싶지 않다면 / 새로운 array을 만들면 된다.(어려움)

- 5.16
  - Selectors(derived state)
    - state자체를 바꾸지 않고 state를 가져다가 원하는대로 모습을 변형시키는 도구
    - atom의 output을 변형하는 도구(<->atom은 그냥 배열 : 단순히 배열을 줌)
