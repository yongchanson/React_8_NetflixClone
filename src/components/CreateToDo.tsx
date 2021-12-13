import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms"; //리팩토링하면서 추가해준것

interface IForm {
    toDo: string;
}

function CreateToDo() {
    // const [toDos, setToDos] = useRecoilState(toDoState);
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => { 
        setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category:"TO_DO"}, ...oldToDos,]) //기존값을 oldToDos으로 지정
        setValue("toDo", "");
};
// console.log(toDos);

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