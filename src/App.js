import { Container} from '@nextui-org/react';
import Header from './components/Header';
import Menu from "./components/Menu"
import Meeting from './components/Meeting';
import GlobalProvider from './components/GlobalProvider';
import appConfig from "./config/firebaseConfig"





function App() {


  return (
      <GlobalProvider>
        <Container css={{width : "90%"}}>
          <Header />
          <Menu />
          <Meeting />
        </Container>
        </GlobalProvider>

  );
}

export default App;
