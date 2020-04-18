import axios from 'axios'
import React, { useEffect, useState } from 'react'

const initState = {
    project: {
        id: '',
        name: '',
        description: '',
        is_completed: false,
        create_at: '',
        updated_at: '',
    },
    title: '',
    errors: [],
    tasks: [],
};
export const SingleProject = ({ match, history }) => {
    const [state, setState] = useState(initState);
    useEffect(() => {
        const projectId = match.params.id;

        axios.get(`/api/projects/${projectId}`).then(response => {
            setState({
                ...state,
                project: response.data,
                tasks: response.data.tasks,
            })
        }).catch(e => console.log(e));
    }, []);

    function handleMarkProjectAsCompleted() {
        axios.put(`/api/projects/${state.project.id}`)
            .then(res => history.push('/'))
    }

    function handleFieldChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    function handleAddNewTask(event) {
        event.preventDefault();
        const task = {
            title: state.title,
            project_id: state.project.id,
        };
        axios.post('/api/tasks', task).then(res => {
            setState({
                ...state,
                title: '',
                tasks: state.tasks.concat(res.data),
            });
        }).catch(err => {
            setState({
                ...state,
                errors: err.response.data.errors,
            });
        })
    }

    function handleMarkTaskAsCompleted(e, taskId) {
        e.preventDefault();
        axios.put(`/api/tasks/${taskId}`).then(res => {
            setState(prevState => {
                const newState = { ...prevState };
                console.log('newState: ', newState);
                newState.tasks.filter(task => task.id === taskId)[0].is_completed = !newState.tasks.filter(task => task.id === taskId)[0].is_completed;
                return newState;
            });
        })
    }

    function hasErrorFor(field) {
        return state.errors[field];
    }

    function renderErrorFor(field) {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    const { project, tasks } = state;
    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>{project.name}</div>
                        <div className='card-body'>
                            <p>{project.description}</p>
                            {state.project.is_completed ?
                                (
                                    <button
                                        className='btn btn-danger btn-sm'
                                        onClick={handleMarkProjectAsCompleted}
                                    >
                                        Mark as uncomplete
                                    </button>
                                ) :
                                (
                                    <button
                                        className='btn btn-primary btn-sm'
                                        onClick={handleMarkProjectAsCompleted}
                                    >
                                        Mark as completed
                                    </button>
                                )
                            }
                            <hr />
                            <form onSubmit={handleAddNewTask}>
                                <div className='input-group'>
                                    <input
                                        type='text'
                                        name='title'
                                        className={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
                                        placeholder='Task title'
                                        value={state.title}
                                        onChange={handleFieldChange}
                                    />
                                    <div className='input-group-append'>
                                        <button className='btn btn-primary'>Add</button>
                                    </div>
                                    {renderErrorFor('title')}
                                </div>
                            </form>
                            <ul className='list-group mt-3'>
                                {tasks.map(task => (
                                    <li
                                        className='list-group-item d-flex justify-content-between align-items-center'
                                        key={task.id}
                                    >
                                        {task.title}
                                        {
                                            task.is_completed ?
                                            (
                                                <button
                                                    className='btn btn-danger btn-sm'
                                                    onClick={(e) => handleMarkTaskAsCompleted(e, task.id)}
                                                >
                                                    Mark as uncomplete
                                                </button>
                                            ) :
                                            (
                                                <button
                                                    className='btn btn-primary btn-sm'
                                                    onClick={(e) => handleMarkTaskAsCompleted(e, task.id)}
                                                >
                                                    Mark as completed
                                                </button>
                                            )
                                        }
                                        
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