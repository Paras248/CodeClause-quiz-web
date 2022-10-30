import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateTest from "./pages/CreateTest";
import AttemptQuiz from "./pages/AttemptQuiz";

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/signin">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/teacherDashboard" exact>
                <Dashboard />
            </Route>
            <Route path="/teacherDashboard/test/create">
                <CreateTest />
            </Route>
            <Route path="/test/:id">
                <AttemptQuiz />
            </Route>
        </Switch>
    );
}

export default App;
