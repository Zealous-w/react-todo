var React = require('react');
var TodoItem = require("./TodoItem");

class TodoTable extends React.Component {
    render() {
        var taskList = this.props.data.map(function(listItem) {
            return (
                <TodoItem
                    taskId = {listItem.id}
                    key = {listItem.id}
                    task = {listItem}
                    complete = {listItem.complete}
                    deleteTask = {this.props.deleteTask}
                    toggleComplete = {this.props.toggleComplete}
                />
            )
        }, this);
        return (
            // <ul className="list-group">
            //     {taskList}
            // </ul>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList}
                </tbody>
            </table>
        )
    }
}

module.exports = TodoTable;