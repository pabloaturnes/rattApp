import { Container} from '@nextui-org/react';
import Header from './components/Header';
import Menu from "./components/Menu"
import Meeting from './components/Meeting';

function App() {
  return (

      <Container css={{width : "90%"}}>
        <Header />
        <Menu />
        <Meeting />
      </Container>

  );
}

export default App;
