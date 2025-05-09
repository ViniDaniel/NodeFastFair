import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/client/Home";
import NavBar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import LoginCliente from "./components/pages/client/LoginCliente";
import LoginFeirante from "./components/pages/seller/LoginFeirante";
import Suporte from "./components/pages/shared/Suporte";
import CadastroCliente from "./components/pages/client/CadastroCliente";
import Footer from "./components/layout/Footer";
import CadastroFeirante from "./components/pages/seller/CadastroFeirante";
import { ClienteProvider } from "./components/context/ClienteContext";
import { FeiranteProvider } from "./components/context/FeiranteContext";

function App() {
  return (
    <FeiranteProvider>
      <ClienteProvider>
        <Router>
          <NavBar />
          <Container customClass="min-height">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/loginCliente" element={<LoginCliente />}></Route>
              <Route path="/loginFeirante" element={<LoginFeirante />}></Route>
              <Route path="/suporte" element={<Suporte />}></Route>
              <Route path="/cadastroCliente" element={<CadastroCliente />} />
              <Route
                path="/cadastroFeirante"
                element={<CadastroFeirante />}
              ></Route>
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ClienteProvider>
    </FeiranteProvider>
  );
}

export default App;
