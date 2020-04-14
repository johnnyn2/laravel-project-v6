import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProjectList from './ProjectList';
import NewProject from './NewProject';
import SingleProject from './SingleProject';

export default function App() {
    return (
        // <div className="container">
        //     <div className="row justify-content-center">
        //         <div className="col-md-8">
        //             <div className="card">
        //                 <div className="card-header">Example Component</div>

        //                 <div className="card-body">I'm an example component!</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path='/' component={ProjectList} />
                    <Route path='/create' component={NewProject} />
                    <Route path='/:id' component={SingleProject} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
