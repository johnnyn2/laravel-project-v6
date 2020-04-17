import axios from 'axios'
import React, { useEffect, useState } from 'react'

const initState = {
    project: {
        name: '',
        description: '',
        tasks: [],
    },
    title: '',
    errors: [],
};
export const SingleProject = ({ match, history }) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        const projectId = match.params.id;

        axios.get(`/api/projects/${projectId}`).then(response => {
            setState({
                project: response.data,
            })
        }).catch(e => console.log(e));
    }, []);

    function handleMarkProjectAsCompleted() {
        axios.put(`/api/projects/${state.project.id}`)
            .then(res => history.push('/'))
    }

    const { project } = state;
    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>{project.name}</div>
                        <div className='card-body'>
                            <p>{project.description}</p>

                            <button
                                className='btn btn-primary btn-sm'
                                onClick={handleMarkProjectAsCompleted}
                            >
                                Mark as completed
                            </button>

                            <hr />

                            <ul className='list-group mt-3'>
                                {project.tasks.map(task => (
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
    );
}