import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}
// recoil의 atom함수
export const toDoState = atom<IToDo[]>({ // IToDo객체로 이루어진 배열임을 나타냄
    key:"toDo",
    default:[],
//selecter사용전에는 모든 todo(카테고리상관X)가 같은 statd제 저장되고 있음
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
      const toDos = get(toDoState);
      return [
        toDos.filter((toDo) => toDo.category === "TO_DO"),//todo의 카테고리가 "TO_DO"와 같으면 남아있다.  
        toDos.filter((toDo) => toDo.category === "DOING"),
        toDos.filter((toDo) => toDo.category === "DONE"),
      ];
    },
  });