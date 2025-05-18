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
import PerfilCliente from "./components/pages/client/PerfilCliente";
import EnderecoForm from "./components/pages/client/EnderecoForm";
import AtualizarCliente from "./components/pages/client/AtualizarCliente";
import AtualizarEndereco from "./components/pages/client/AtualizarEndereco";
import PerfilFeirante from "./components/pages/seller/PerfilFeirante";
import AtualizarFeirante from "./components/pages/seller/AtualizarFeirante";

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
              <Route path="/atualizar_cliente/:clienteId" element={<AtualizarCliente />}></Route>
              <Route
                path="/cadastroFeirante"
                element={<CadastroFeirante />}
              ></Route>
              <Route path="/perfilCliente" element={<PerfilCliente />}></Route>
              <Route
                path="/cadastrar-endereco"
                element={<EnderecoForm />}
              ></Route>
              <Route path="/atualizar_endereco/:clienteId" element={<AtualizarEndereco />} ></Route>
              <Route path="/perfilFeirante" element={<PerfilFeirante />} ></Route>
              <Route path="/atualizar_feirante/:feiranteId" element={<AtualizarFeirante />} ></Route>
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ClienteProvider>
    </FeiranteProvider>
  );
}

export default App;
