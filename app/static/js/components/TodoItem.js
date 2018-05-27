var React = require('react');
var ReactDOM = require('react-dom');

class TodoItem extends React.Component {

    toggleComplete() {
        this.props.toggleComplete(this.props.taskId)
    }

    deleteTask() {
        this.props.deleteTask(this.props.taskId)
    }

    handleMouseOver() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
    }

    handleMouseOut() {
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
    }

    render() {
        var task = this.props.task;
        // var classes = "list-group-item";
        // var itemChecked;

        // if (this.props.complete === "true") {
        //     task = <s>{task}</s>
        //     itemChecked = true;
        //     classes += " list-group-item-success"
        // } else {
        //     classes += " list-group-item-danger"
        //     itemChecked = false;
        // }
        console.log('TodoItem ' + task.name)
        return (
            <tr>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.age}</td>
                <td>
                     <button type="button" className="btn btn-danger" onClick={this.deleteTask.bind(this)} ref="deleteBtn">删除</button>
                </td>
            </tr>
            // <li className={classes} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
            //     <input type="checkbox" checked={itemChecked} onChange={this.toggleComplete.bind(this)} className="pull-left" />
            //     {task}
            //     <div className="pull-right">
            //         <button type="button" className="btn btn-xs close" onClick={this.deleteTask.bind(this)} ref="deleteBtn">删除</button>
            //     </div>   
            // </li>
        )
    }
}

module.exports = TodoItem;