import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/components/Home';
import { NewRoom } from '../src/components/NewRoom';
import { Room } from '../src/components/Room';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;
