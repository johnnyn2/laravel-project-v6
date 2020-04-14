import axios from 'axios'
import React, { Component } from 'react'

class SingleProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {},
            tasks: []
        }
    }

    componentDidMount() {
        const projectId = this.props.match.params.id
        console.log('proect id: ', projectId)

        // axios.get(`/api/projects/${projectId}`).then(response => {
        //     this.setState({
        //         project: response.data,
        //         tasks: response.data.tasks
        //     })
        // })

        this.setState({
            project: {name: 'Project 1', description: 'This is project 1'},
            tasks: [
                {id: 0, title: 'Draw app icon'},
                {id: 1, title: 'Set up react boilerplate'},
                {id: 2, title: 'Set up database'},
            ],
        })
    }

    render() {
        const { project, tasks } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>{project.name}</div>
                            <div className='card-body'>
                                <p>{project.description}</p>

                                <button className='btn btn-primary btn-sm'>
                                    Mark as completed
                                </button>

                                <hr />

                                <ul className='list-group mt-3'>
                                    {tasks.map(task => (
                                        <li
                                            className='list-group-item d-flex justify-content-between align-items-center'
                                            key={task.id}
                                        >
                                            {task.title}

                                            <button className='btn btn-primary btn-sm'>
                                                Mark as completed
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleProject