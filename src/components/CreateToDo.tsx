import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms"; //리팩토링하면서 추가해준것

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const toDoSave = useRecoilValue(toDoState);//로컬 스토리지
    // const [toDos, setToDos] = useRecoilState(toDoState);
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);//카테고리값을 기억하기 위해
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => { 
        setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category}, ...oldToDos,]); //기존값을 oldToDos으로 지정
        setValue("toDo", "");
};
// console.log(toDos);
        localStorage.setItem("todos", JSON.stringify(toDoSave));//로컬 스토리지
return(
    <div>
        <form onSubmit={handleSubmit(handleValid)}>
            <input{...register("toDo", {required: "Please write a To Do",})}
            placeholder="Write a to do"/>
            
            <button>Add</button>
        </form>
    </div>
  );
}

export default CreateToDo;