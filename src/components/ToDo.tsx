import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

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
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name }; //category: name 버튼이 준 카테고리받기
      // console.log(targetIndex);//toDo의 경로찾기(index)
      console.log(oldToDo, newToDo);
      return oldToDos;
    });
  };
  
  return (
    <li>
      {/* &&뒤는 조건이 충족되면 실행되는 값이다 */}
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
        // <button onClick={() => onClick("Done")}>Done</button>
      )}
    </li>
  );
}

export default ToDo;