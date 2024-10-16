import { FC, useMemo, useState } from "react";
import { RootState } from "../../store";
import { TodoEntity } from "../../entities/TodoEntity";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import todosSlice, { changeIsDone, editToDo, sortTodos } from "../../store/todos/todosSlice";
import { removeToDo } from "../../store/todos/todosSlice";
import TextField from "../../components/TextField";

interface ToDoItemProps {
    todo: TodoEntity
}
const ToDoItem:FC<ToDoItemProps> = ({todo}) => {
    const [editible, setEditible] = useState(false)
    const [title, setTitle] = useState(todo.title)
    const dispatch = useDispatch()
    const removeHandler = (id: TodoEntity['id']) => {
        dispatch(removeToDo(id));
      }
    const changeStatus = (id: TodoEntity['id']) => {
        dispatch(changeIsDone(id))
      }
    const changeTitle = (id: TodoEntity['id']) => {
        setEditible(!editible)
        if( editible ) {
            dispatch(editToDo({id, title}))
        }
      }

    return (
        <>
                <div className="flex gap-x-3">

{
  todo.isDone ? <h1>Выполенно</h1> : <h2>Не выполенно</h2>
}
<li>{todo.title}</li>
<Button onClick={() => removeHandler(todo.id)}>remove</Button>
<Button onClick={() => changeStatus(todo.id)}>Done!</Button>
<Button onClick={()=> changeTitle(todo.id)}>
  {
    editible ? "save" : "edit"
  }
</Button>
{
  editible ? 
  <TextField value={title} onChange={(val) => setTitle(val)}/> 
  : null
}
</div>
        </>
    )
}
export default ToDoItem