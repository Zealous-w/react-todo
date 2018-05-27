import React from 'react';
import {TodoForm} from './TodoForm';
import TodoTable from './TodoTable';
import axios from 'axios';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [], 
            id : 0,
            name : "",
            age: 0,
        }
    }

    onUniqueId(value) {
        console.log('Todo onUniqueId ' + value)
        this.setState({id:value})
    }

    onName(value) {
        this.setState({name:value})
    }

    onAge(value) {
        this.setState({age:value})
    }

    httpDataPost() {
        console.log("httpDataPost")
        var param = {
            id:this.state.id,
            name : this.state.name,
            age: this.state.age,
        }
        axios.post('/main/user/', param).then((res)=>{
            if (res.data.ret == "success") {
                var data = this.state.data;
                data = data.concat([param]);
                this.setState({data:data});
            }
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    httpGetListInfo() {
        axios.get('/main/users').then((res)=>{
            var dataTmp = [];
            for(var index in res.data.data) {
                var item = JSON.parse(res.data.data[index]);
                dataTmp.push({id:item["id"], name:item["name"], age:item["age"]})
            }
            this.setState({data:dataTmp})
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount() {
        this.httpGetListInfo()
    }

    handleTaskDelete(taskId) {
        console.log("handleTaskDelete delete " + taskId)
        var param = {
            id:taskId,
        }
        axios.delete('/main/user/', {params: param}).then((res)=>{
            console.log(res)
            if (res.data.ret == "success") {
                var data = this.state.data;
                data = data.filter(function(task) {
                    return task.id !== taskId;
                });
                this.setState({data:data});
            } 
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleToggleComplete(taskId) {
        console.log('handleToggleComplete complete ' + taskId)
    }

    render() {
        var statistics = {todoCount:1}
        return (
            <div className="well">
            <nav className="navbar navbar-inverse" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">TODO</a>
                    </div>
                </div>
            </nav>
                <h1 className="text-center">React Todo</h1>
                <TodoForm parentSubmit={this.httpDataPost.bind(this)} parentOnUniqueId={this.onUniqueId.bind(this)} parentOnName={this.onName.bind(this)} parentOnAge={this.onAge.bind(this)}/>
                <TodoTable data={this.state.data}
                    deleteTask={this.handleTaskDelete.bind(this)}
                    toggleComplete={this.handleToggleComplete}
                    todoCount={statistics.todoCount}
                    todoCompleteCount={statistics.todoCompleteCount} />
          </div>
        )
    }
}

export {Todo};