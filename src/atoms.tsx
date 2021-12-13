import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}
// recoil의 atom함수
export const toDoState = atom<IToDo[]>({ // IToDo객체로 이루어진 배열임을 나타냄
    key:"toDo",
    default:[],
})