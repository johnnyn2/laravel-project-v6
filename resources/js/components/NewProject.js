import axios from 'axios'
import React, { useState } from 'react'

const initState = {
    name: '',
    description: '',
    errors: [],
};
export const NewProject = ({ history }) => {
    const [state, setState] = useState(initState);

    function handleFieldChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    function handleCreateNewProject(e) {
        e.preventDefault();

        const project = {
            name: state.name,
            description: state.description
        };

        axios.post('/api/projects', project)
            .then(response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {
                setState({
                    errors: error.response.data.errors
                })
            })
    }
    function hasErrorFor(field) {
        return !!state.errors[field];
    }
    function renderErrorFor(field) {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>Create new project</div>
                        <div className='card-body'>
                            <form onSubmit={handleCreateNewProject}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Project name</label>
                                    <input
                                        id='name'
                                        type='text'
                                        className={`form-control ${hasErrorFor('name') ? 'is-invalid' : ''}`}
                                        name='name'
                                        value={state.name}
                                        onChange={handleFieldChange}
                                    />
                                    {renderErrorFor('name')}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='description'>Project description</label>
                                    <textarea
                                        id='description'
                                        className={`form-control ${hasErrorFor('description') ? 'is-invalid' : ''}`}
                                        name='description'
                                        rows='10'
                                        value={state.description}
                                        onChange={handleFieldChange}
                                    />
                                    {renderErrorFor('description')}
                                </div>
                                <button className='btn btn-primary'>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}