import axios from 'axios'
import React, { useEffect, useState } from 'react'

const initState = {
    project: {
        name: '',
        description: '',
        tasks: [],
    },
};
export const SingleProject = ({ match }) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        const projectId = match.params.id;

        axios.get(`/api/projects/${projectId}`).then(response => {
            setState({
                project: response.data,
            })
        }).catch(e => console.log(e));

        setState({
            project: {
                name: 'Project 1',
                description: 'This is project 1',
                tasks: [
                    { id: 0, title: 'Draw app icon' },
                    { id: 1, title: 'Set up react boilerplate' },
                    { id: 2, title: 'Set up database' },
                ],
            },
        });
    }, []);


    const { project } = state;
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