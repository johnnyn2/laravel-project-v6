import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const initState = {
    projects: [],
};
export const ProjectList = (props) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        let isCancelled = false;
        axios.get('api/projects').then(res => {
            if (!isCancelled) {
                setState({
                    projects: res.data,
                });
            }
        });
        return () => {
            isCancelled = true;
        }
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
                            <Link className='btn btn-primary btn-sm mb-3' to='/projects/create'>
                                Create new project
                            </Link>
                            <ul className='list-group list-group-flush'>
                                {projects.map(project => (
                                    <Link
                                        className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                        to={`/projects/${project.id}`}
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