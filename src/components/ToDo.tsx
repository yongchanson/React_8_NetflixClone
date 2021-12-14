import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState); //atom을 수정가능하게 만든것
  // const onClick = (newCategory: IToDo["category"]) => {
  //   console.log("i wanna to", newCategory);
  //   console.log("i wanna to", event.currentTarget.name);
  // };
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
  //  event.currentTarget.name
    const {
      currentTarget: { name },
    } = event;
  }
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