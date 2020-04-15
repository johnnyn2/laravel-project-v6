import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const initState = {
    projects: [],
};
export const ProjectList = (props) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        setState(initState => ({
            ...initState,
            projects: [
                {
                    id: 0,
                    name: 'Project 1',
                    tasks_count: 3,
                }, {
                    id: 1,
                    name: 'Project 2',
                    tasks_count: 4,
                }
            ],
        }));
    }, []);

    console.log('project list: ', props);
    const {projects} = state;
    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>All projects</div>
                        <div className='card-body'>
                            <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                Create new project
                                </Link>
                            <ul className='list-group list-group-flush'>
                                {projects.map(project => (
                                    <Link
                                        className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                        to={`/${project.id}`}
                                        key={project.id}
                                    >
                                        {project.name}
                                        <span className='badge badge-primary badge-pill'>
                                            {project.tasks_count}
                                        </span>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}