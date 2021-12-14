import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState, Categories } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState); //atom을 수정가능하게 만든것
  // const onClick = (newCategory: IToDo["category"]) => {
  //   console.log("i wanna to", newCategory);
    // console.log("i wanna to", event.currentTarget.name);
  // };
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
  //  event.currentTarget.name
    const {
      currentTarget: { name },
    } = event;
    // console.log("i wanna to", event.currentTarget.name);
    setToDos((oldToDos) => { //toDo의 경로찾기(index)
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any }; //category: name 버튼이 준 카테고리받기
      // console.log(targetIndex);//toDo의 경로찾기(index확인 : 배열의 0,1,2,3...)
      // console.log(oldToDo, newToDo);//카테고리확인, 바뀌진않음(oldToDo, newToDo 확인)
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  
  return (
    <li>
      {/* &&뒤는 조건이 충족되면 실행되는 값이다 */}
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
        //<button onClick={() => onClick("Done")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;