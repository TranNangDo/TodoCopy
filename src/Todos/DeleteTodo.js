import React from "react";
import { toast } from "react-toastify";
class DeleteTodo extends React.Component {
    handleDelete = (todo) => {
        let currentTodo = this.state.listTodo;
        currentTodo = currentTodo.filter(item => item.id !== todo.id);
        this.setState ({
            listTodo: currentTodo 
        })
    }
render(){
    return (
        <button className="delete" onClick = {() => this.handleDelete()}>Delete</button>
    )
}
}
export default DeleteTodo;