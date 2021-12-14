
import React from "react";
// import { toDoSelector, toDoState } from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    
    // const selectorOutput = useRecoilValue(toDoSelector);
        //!!useRecoilValue(toDoSelector)의 return값은 배열임
    
    // console.log(toDos);
    // console.log(selectorOutput);
    
    // const [toDo, doing, done] = useRecoilValue(toDoSelector);//useRecoilValue(toDoSelector)의 3개의배열을 꺼내기 위한 작업
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        // console.log(event.currentTarget.value) //옵션을 셀렉했을때 옵션value을 받는지 확인
        setCategory(event.currentTarget.value); //input이 변할때 setCategory호출
        // console.log(category);//옵션을 셀렉했을때 카테고리를 받는지 확인(vlaue={category}필요)
    }
return(
    <div>
        <h1> ToDo List</h1>
        <hr />
        {/* submit할거면 <Form> 필요 */}
            <select value={category} onInput={onInput}>
                <option value="TO_DO">ToDo</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
        <CreateToDo />
        {/* {category ==="TO_DO" && toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
        {category ==="DOING" && doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
        {category ==="DONE" && done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)} */}
        
        {toDos?.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}



    {/*카테고리state가 없을때 사용한 것들  */}
        {/* <h2>ToDo</h2>
        <ul>
            {toDo.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))} */}
                    {/* {toDos.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))} */}{/* toDo는 모든 props를 받는 상태(3개 : To_Do, DOING, DONE) */}
                    {/* {toDos.map((toDo) => (<ToDo text={toDo.text} category={toDo.category} id={toDo.id} />))} */}
                    {/* ToDo와 toDoState은 둘다 IToDo타입이라 prop가 같음 / 위두식은 같은식임 */}
        {/* </ul>
        <hr />
        <h2>Doing</h2>
        <ul>
            {doing.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
        </ul>
        <hr />
        <h2>Done</h2>
        <ul>
            {done.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
        </ul>   */}
    </div>
);
}

export default ToDoList;