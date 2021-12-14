
import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    
    // const selectorOutput = useRecoilValue(toDoSelector);
        //!!useRecoilValue(toDoSelector)의 return값은 배열임
    
    // console.log(toDos);
    // console.log(selectorOutput);
    const [toDo, doing, done] = useRecoilValue(toDoSelector);//useRecoilValue(toDoSelector)의 3개의배열을 꺼내기 위한 작업

return(
    <div>
        <h1> ToDo List</h1>

        <CreateToDo />
        <h2>ToDo</h2>
        <ul>
            {toDo.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
            {/* {toDos.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))} */}
            {/* toDo는 모든 props를 받는 상태(3개 : To_Do, DOING, DONE) */}
            {/* {toDos.map((toDo) => (<ToDo text={toDo.text} category={toDo.category} id={toDo.id} />))} */}
            {/* ToDo와 toDoState은 둘다 IToDo타입이라 prop가 같음 / 17~18식은 같은식임 */}
        </ul>
        <hr />
        <h2>Doing</h2>
        <ul>
            {doing.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
        </ul>
        <hr />
        <h2>Done</h2>
        <ul>
            {done.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
        </ul>  
    </div>
);
}

export default ToDoList;