import React from 'react';
import axios from 'axios';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 0,
            name : "",
            age: 0,
        }
    }

    submitTask(e) {
        this.props.parentSubmit()
    }

    onUniqueId(e) {
        this.props.parentOnUniqueId(e.target.value)
        // this.setState({id:e.target.value})
    }

    onName(e) {
        this.props.parentOnName(e.target.value)
    }

    onAge(e) {
        this.props.parentOnAge(e.target.value)
    }

    render() {
        return (
            <div>
                <hr />
                <form className="form-horizontal" onSubmit={this.submitTask.bind(this)}>
                    <div className="form-group">
                        <label className="col-md-1 control-label">New User</label>
                        <div className="col-md-2">
                            <input type="text" id="uniqueid" className="form-control" placeholder="id" onChange={this.onUniqueId.bind(this)}></input>
                        </div>
                        <div className="col-md-4">
                            <input type="text" id="name" className="form-control" placeholder="name" onChange={this.onName.bind(this)}></input>
                        </div>
                        <div className="col-md-4">
                            <input type="text" id="age" className="form-control" placeholder="age" onChange={this.onAge.bind(this)}></input>
                        </div>
                        <div className="col-md-1">
                            <input type="submit" value="添加" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export {TodoForm};