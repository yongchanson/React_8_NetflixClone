
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, Categories, customCategoryState, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";

function ToDoList() {
    // const toDos = useRecoilValue(toDoState);
    
    // const selectorOutput = useRecoilValue(toDoSelector);
        //!!useRecoilValue(toDoSelector)의 return값은 배열임
    
    // console.log(toDos);
    // console.log(selectorOutput);
    
    // const [toDo, doing, done] = useRecoilValue(toDoSelector);//useRecoilValue(toDoSelector)의 3개의배열을 꺼내기 위한 작업
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const customCategories = useRecoilValue(customCategoryState); // 커스텀카테고리
    const allToDos = useRecoilValue(toDoState);//새 카테고리가 여러개 생기는것 방지
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {    
        // console.log(event.currentTarget.value) //옵션을 셀렉했을때 옵션value을 받는지 확인
        setCategory(event.currentTarget.value as any); //input이 변할때 setCategory호출
        // console.log(category);//옵션을 셀렉했을때 카테고리를 받는지 확인(vlaue={category}필요)
    };
    useEffect(() => {
        localStorage.setItem("TODOS", JSON.stringify(allToDos))
    }, [allToDos]) //새 카테고리가 여러개 생기는것 방지
    // console.log(toDos);
return(
    <div>
        <h1> ToDo List</h1>
        <hr />
        {/* submit할거면 <Form> 필요 */}
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>ToDo</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
                {customCategories.map(category => (//커스텀카테고리
                    <option key={category.id} value={category.title}>{category.title}</option>
                ))}
            </select>
            
            <CreateCategory />{/*카테고리추가 */}

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