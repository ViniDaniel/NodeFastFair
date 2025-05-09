import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import LoginCliente from "./components/pages/LoginCliente";
import LoginFeirante from "./components/pages/LoginFeirante";
import Suporte from "./components/pages/Suporte";
import CadastroCliente from "./components/pages/CadastroCliente";
import Footer from "./components/layout/Footer";
import CadastroFeirante from "./components/pages/CadastroFeirante";
import { ClienteProvider } from "./components/context/ClienteContext";




function App() {
  return (
    <ClienteProvider>
    <Router> 
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loginCliente" element={<LoginCliente />} ></Route>
          <Route path="/loginFeirante" element ={<LoginFeirante />} ></Route>
          <Route path="/suporte" element={<Suporte />} ></Route>
          <Route path="/cadastroCliente" element={<CadastroCliente />} />
          <Route path="/cadastroFeirante" element={<CadastroFeirante />} ></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
    </ClienteProvider>
  );
}

export default App;
