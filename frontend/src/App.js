import './App.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MyHome from './pages/Home/Home';
import Question from './pages/Question/Question';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './components/PrivateRoute';
import NewQuestion from './pages/NewQuestion/NewQuestion';
import QuestionsSearch from './pages/Home/subpages/Search/QuestionsSearch';
import NoReplies from './pages/Home/subpages/QuestionWithoutReplies/NoReplies';
import NoViews from './pages/Home/subpages/WithoutViews/NoViews';
import ListByTag from './pages/Home/subpages/ListByTag/ListByTag';
import Popular from './pages/Home/subpages/Popular/Popular';
import MasVotado from './pages/Home/subpages/MasVotado/MasVotado';
import MasViejo from './pages/Home/subpages/MasViejo/MasViejo';
import { useState } from 'react';
import Loading from './components/Loading/Loading';

function App() { 

  const [isLoading, setLoading ] = useState(true);

  setTimeout( () => { 
    setLoading(false);
  }, 2000 )
  return (
    <>
    {isLoading && <Loading/> }
      <Router>
      <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={MyHome} />
          <Route exact path='/question' component={MyHome} />
          <PrivateRoute exact path='/question/add' component={NewQuestion} />
          <Route exact path='/question/:_id' component={Question} />
          <Route exact path='/tag/:tag' component={ListByTag} />
          <Route exact path='/questionnoreply' component={NoReplies} />
          <Route exact path='/popular' component={Popular} />
          <Route exact path='/mostvoted' component={MasVotado} />
          <Route exact path='/olds' component={MasViejo} />
          <Route exact path='/withoutviews' component={NoViews} />
          <Route exact path='/search/:searchText' component={QuestionsSearch} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path='/' component={MyHome} />
           
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
