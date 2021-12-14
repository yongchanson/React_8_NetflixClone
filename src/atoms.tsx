import { atom, selector } from "recoil";

export enum Categories { //enumerable(열거형) : 이름이 있는 상수들의 집합을 정의
  // "TO_DO",
  // "DOING",
  // "DONE",
  "TO_DO" = "TO_DO",//타입을 string으로 설정
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});
// recoil의 atom함수
export const toDoState = atom<IToDo[]>({ // IToDo객체로 이루어진 배열임을 나타냄
    key:"toDo",
    default:[],
//selecter사용전에는 모든 todo(카테고리상관X)가 같은 statd제 저장되고 있음
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {//???
      const toDos = get(toDoState);
      const category = get(categoryState);
    //   return [ //(방법1)배열을 담은 배열을 반환하는 것
    //     toDos.filter((toDo) => toDo.category === "TO_DO"),//todo의 카테고리가 "TO_DO"와 같으면 남아있다.  
    //     toDos.filter((toDo) => toDo.category === "DOING"),
    //     toDos.filter((toDo) => toDo.category === "DONE"),
    //   ];

    //   //(방법2)배열을 담은 배열을 반환하는 것
    //     if(category==="TO_DO") return toDos.filter((toDo) => toDo.category === "TO_DO"),//todo의 카테고리가 "TO_DO"와 같으면 남아있다.  
    //     if(category==="DOING") returntoDos.filter((toDo) => toDo.category === "DOING"),
    //     if(category==="DONE") returntoDos.filter((toDo) => toDo.category === "DONE"),
    //  

      return toDos.filter((toDo) => toDo.category === category); //카테고리에 따라 하나의 배열만 반환
    },
  });