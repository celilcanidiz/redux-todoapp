import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";
import axios from 'axios';

export const getTodoAsync = createAsyncThunk("todos/getTodoAsync/", async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.json();
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync/', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync/', async ({id, data }) =>{
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {  
     await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`)
    return id;
});

export const todosSlice = createSlice({
    name:'todos',
    initialState: {
        items:[],
        activeFilter: 'all',
        isLoading:false,
        error:null,
        addNewTodoLoading: false,
        addNewTodoError:null,
    },
    reducers:{
        changeActiveFilter:(state,action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted:(state, action) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        }
    },
    extraReducers:{
        //get todo begins
        [getTodoAsync.pending]: (state,action) => {
            state.isLoading = true;
        },
        [getTodoAsync.fulfilled]: (state,action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodoAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //get todo ends
        // add todo begins
        [addTodoAsync.pending]: (state,action) => {
            state.addNewTodoLoading= true;
        },
        [addTodoAsync.fulfilled]: (state,action) => {
            state.items.push(action.payload);
            state.addNewTodoLoading= false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoLoading = false;
            state.addNewTodoError = action.error.message;
        },
        //add todo ends
        //toggle todo begins
        [toggleTodoAsync.fulfilled]:(state,action) =>{
            const {id, completed} = action.payload;
            const index= state.items.findIndex(item => item.id === id);
            state.items[index].completed = completed;
        },
        //toggle todo ends
        //remove todo begins
        [removeTodoAsync.fulfilled]:(state, action) => {
            const id = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items.splice(index,1);
        }
        //remove todo ends
        //remove ActiveTodos begins

        //remove ActiveTodos ends
    },
});
export const { destroy, changeActiveFilter, clearCompleted} = todosSlice.actions; 
export default todosSlice.reducer;

