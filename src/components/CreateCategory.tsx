import { customCategoryState, ICustomCategory, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from  "styled-components";

const Form = styled.form`
`;

const Button = styled.button`
`;

interface IForm {
    customCategory: string;
}

function CreateCategory() {
    const toDoSave = useRecoilValue(toDoState);//로컬 스토리지
    const setCustomCategory = useSetRecoilState(customCategoryState)
    const { register, handleSubmit, setValue } = useForm();
    const onValid = ({ customCategory }:IForm) => {
        setCustomCategory(prevCategories => [ {title:customCategory, id:Date.now()}, ...prevCategories])
        setValue("customCategory", "")
    }
    localStorage.setItem("todos", JSON.stringify(toDoSave));//로컬 스토리지
    return(
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("customCategory")} placeholder="새 카테고리 추가" />
            <Button><i className="fas fa-plus-square"></i></Button>
        </Form>
    )
}

export default CreateCategory;