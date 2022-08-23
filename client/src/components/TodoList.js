import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux/';
import {getTodoAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/todoSlice';
import Loading from './Loading';
import Error from './Error';



let filtered = [];
function TodoList() {
    const items = useSelector(state => state.todos.items);
    const activeFilter = useSelector(state => state.todos.activeFilter);
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.todos.isLoading);
    const error = useSelector((state) => state.todos.error);
    useEffect(() => {
        dispatch(getTodoAsync());
    }, [dispatch])

    const handleDestroy = async (id) => {
        if (window.confirm('are you sure?')){
            await dispatch(removeTodoAsync(id));
        }
    } 

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({id, data:{completed}}))
    }

    filtered = items;
    if(activeFilter !== 'all'){
        filtered = items.filter((todo) =>  activeFilter === 'active' 
        ? todo.completed === false : todo.completed === true ,)
    }   
    if (isLoading) {
        return <div><Loading/></div>
    }
    if (error) {
        return <div><Error message={error}/></div>
    }
  return (
    <ul className="todo-list">
         {/*<li className="completed">
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Learn JavaScript</label>
                <button className="destroy"></button>
            </div>
  </li>*/}
        
        {
            filtered.map((item)=> (
        <li key={item.id} className={item.completed ? "completed" : " "}>
            <div className="view">
                <input className="toggle" type="checkbox" 
                checked={item.completed} 
                onChange={() => handleToggle(item.id, !item.completed)} />
                <label>{item.title}</label>
                <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
            </div>
        </li>
            ))
        }
    </ul>
  )
}

export default TodoList