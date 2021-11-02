import { useContext } from 'react';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import View from './pages/view/View';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import { Context } from './context/Context';

function App() {

   const { user } = useContext(Context);

   return (
     <Router>
         <Topbar />
             <Switch>
                <Route exact path="/">
                    { user ? <Home /> : <Redirect to="/register" /> }
                </Route>
                <Route path="/register">
                    { user ? <Redirect to="/" /> : <Register /> }
                </Route>
                <Route path="/login">
                    { user ? <Redirect to="/" /> : <Login /> }
                </Route>
                <Route path="/write">
                    { user ? <Write /> : <Redirect to="/" /> }
                </Route>
                <Route path="/contact">
                    { user ? <Contact /> : <Redirect to="/" /> }
                </Route>
                <Route path="/settings">
                    { user ? <Settings /> : <Redirect to="/" /> }
                </Route>
                <Route path="/post/:postId">
                    <View />
                </Route>
             </Switch>
         <Footer />
     </Router>
   );
}

export default App;
