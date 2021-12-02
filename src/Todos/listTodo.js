import React from 'react';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';
import './listTodo.scss';
import DeleteTodo from './DeleteTodo';

class ListTodo extends React.Component {
    state= {
        listTodo: [
            {id: 'todo1', title: 'Doing homework'},
            {id: 'todo2', title: 'Giat do'},
            {id: 'todo3', title: 'Xem Phim'},
        ],
        editTodo: {}
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodo: [todo, ...this.state.listTodo]
        })
        toast.success("Thêm thành công!")
    }
    handleDelete = (todo) => {
        let currentTodo = this.state.listTodo;
        currentTodo = currentTodo.filter(item => item.id !== todo.id);
        this.setState ({
            listTodo: currentTodo 
        })
        toast.success("Xóa thành công!")
    }
    handleEdit = (todo) => {
        let {editTodo, listTodo} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0
        if(isEmptyObj === false && editTodo.id === todo.id){
            let listTodoCopy = [...listTodo];
            let objIndex = listTodoCopy.findIndex((item => item.id === todo.id));
            listTodoCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodo: listTodoCopy,
                editTodo: {}
            })
            toast.success("Cập nhật thành cônggg!")
            return;
        }
        this.setState({
            editTodo: todo
        })
    }
    handleOnChangeEdit = (event) => {
        let editTodoCopy = {...this.state.editTodo}
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let {listTodo, editTodo} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0
        return (
        <div className="list-todo-container">
            <AddTodo
            addNewTodo={this.addNewTodo}/>
            <div className="list-todo-content">
                { listTodo && listTodo.length > 0 && listTodo.map((item, index) => {
                    return (
                        <div className="todo-child" key={item.id}>
                            {isEmptyObj === true ?
                        <span> {index + 1} - {item.title} </span>
                        :
                        <>
                        {editTodo.id === item.id ?
                        <span>
                            {index + 1} - <input value={editTodo.title} onChange={(event) => this.handleOnChangeEdit(event)}/>
                        </span>
                        :
                        <span> {index + 1} - {item.title} </span>
                        }
                        </>
                        
                            }
                        <button className="edit" onClick={() => this.handleEdit(item)}>
                            {isEmptyObj === false && editTodo.id === item.id ?
                            'Save':'Edit'
                            }
                            </button>
                        <button className="delete" onClick = {() => this.handleDelete(item)}>Delete</button>
            </div>
                    )
                })}
            
            </div>
        </div>
        )
    }
}

export default ListTodo;