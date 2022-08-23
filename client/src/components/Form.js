import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../redux/todos/todoSlice';
import Error from "./Error";
function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.todos.addNewTodoLoading);
    const error = useSelector(state => state.todos.addNewTodoError);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title) return;
        await dispatch(addTodoAsync({title}));
        setTitle("");
}


  return (
    <div>
        <form onSubmit={handleSubmit} style={{display:"flex", alignItems:"center"}}>
			<input 
      className="new-todo" 
      placeholder="What needs to be done?" 
      autoFocus value={title} 
      onChange={(e)=> setTitle(e.target.value)} 
      disabled={isLoading}
      />
      
      {isLoading && <span style={{paddingRight:10}}>Loading..</span>}
      {error && <Error message={error}/>}
    </form>
    </div>
  )
}

export default Form