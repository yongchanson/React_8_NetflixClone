
import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    console.log(toDos);
return(
    <div>
        <h1> ToDo List</h1>

        <CreateToDo />
        
        <ul>
            {toDos.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
            {/* toDo는 모든 props를 받는 상태(3개 : To_Do, DOING, DONE) */}
            {/* {toDos.map((toDo) => (<ToDo text={toDo.text} category={toDo.category} id={toDo.id} />))} */}
            {/* ToDo와 toDoState은 둘다 IToDo타입이라 prop가 같음 / 17~18식은 같은식임 */}
        </ul>
    </div>
);
}

export default ToDoList;