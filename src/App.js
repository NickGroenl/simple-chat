import React , {Component} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route
    
} from "react-router-dom";
import './css/chat.css';
import GlobalChat from './components/global-chat';




class App extends Component {
    render(){  
        return (
            <Router>
                
                <div className="container">

                    <Switch>

                        <Route path='/global-chat'>
                            <GlobalChat></GlobalChat>
                        </Route>
                        
                    </Switch>

                </div>

            </Router>
        );
    }
}

export default App;