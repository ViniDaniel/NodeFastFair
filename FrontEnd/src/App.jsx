import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/client/shop/Home";
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
import NotFound from "./components/pages/shared/NotFound";
import Sobre from "./components/pages/shared/Sobre";
import ProdutoAdd from "./components/pages/seller/store/ProdutoAdd";
import EstoqueFeirante from "./components/pages/seller/store/EstoqueFeirante";
import ProdutoAtt from "./components/pages/seller/store/ProdutoAtt";
import AddDescricao from "./components/pages/seller/custom/AddDescricao";
import  DescricaoFeirante  from "./components/pages/seller/custom/DescricaoFeirante";
import CategoriasProduto from "./components/pages/client/shop/CategoriasProduto";
import Colaboradores from "./components/pages/client/shop/colaboradores/Colaboradores";
import Frutas from "./components/pages/client/shop/categorias/Frutas";
import Graos from "./components/pages/client/shop/categorias/Graos";
import Legumes from "./components/pages/client/shop/categorias/Legumes";
import Temperos from "./components/pages/client/shop/categorias/Temperos";
import Verduras from "./components/pages/client/shop/categorias/Verduras";
import PesquisaProdutos from "./components/pages/client/shop/Produtos/PesquisaProdutos";
import ColaboradorPerfil from "./components/pages/client/shop/colaboradores/ColaboradorPerfil";
import Carrinho from "./components/pages/client/shop/Carrinho";
import PedidosPagos from "./components/pages/client/shop/pedidos/PedidosPagos";
import PedidoErro from "./components/pages/client/shop/pedidos/PedidoErro";
import PedidoPendente from "./components/pages/client/shop/pedidos/PedidoPendente";
import Laticinios from "./components/pages/client/shop/categorias/Laticinios";


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
                path="/atualizar_cliente/:clienteId"
                element={<AtualizarCliente />}
              ></Route>
              <Route
                path="/cadastroFeirante"
                element={<CadastroFeirante />}
              ></Route>
              <Route path="/perfilCliente" element={<PerfilCliente />}></Route>
              <Route
                path="/cadastrar-endereco"
                element={<EnderecoForm />}
              ></Route>
              <Route
                path="/atualizar_endereco/:clienteId"
                element={<AtualizarEndereco />}
              ></Route>
              <Route
                path="/feirante/perfilFeirante"
                element={<PerfilFeirante />}
              ></Route>
              <Route
                path="/feirante/atualizar_feirante/:feiranteId"
                element={<AtualizarFeirante />}
              ></Route>
              <Route path="/sobre" element={<Sobre />}></Route>
              <Route path="/feirante/adicionar-produto" element={<ProdutoAdd />}></Route>
              <Route path="/atualizar_produto/:feiranteId/:produtoId"  element={<ProdutoAtt/>}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/feirante/estoque" element={<EstoqueFeirante />} ></Route>
              <Route path="/feirante/adicionar_descricao/" element={<AddDescricao />}></Route>
              <Route path="/feirante/descricao" element={<DescricaoFeirante />}></Route>
              <Route path="/produtos/categorias" element={<CategoriasProduto />} ></Route>
              <Route path="/colaboradores" element={<Colaboradores />}></Route>
              <Route path="/produtos/categorias/Fruta" element={<Frutas />} ></Route>
              <Route path="/produtos/categorias/Grãos" element={<Graos />} ></Route>
              <Route path="/produtos/categorias/Laticínios" element={<Laticinios />} ></Route>
              <Route path="/produtos/categorias/Legume" element={<Legumes />} ></Route>
              <Route path="/produtos/categorias/Temperos" element={<Temperos />}></Route>
              <Route path="/produtos/categorias/Verdura" element={<Verduras />} ></Route>
              <Route path="/produtos/pesquisa" element={<PesquisaProdutos />} ></Route>
              <Route path="/public/colaborador/:id" element={<ColaboradorPerfil />} ></Route>
              <Route path="/cliente/carrinho"  element={<Carrinho />}></Route>
              <Route path="/cliente/pedidos/confirmados" element={<PedidosPagos />}></Route>
              <Route path="/cliente/pedido/erro" element={<PedidoErro />}></Route>
              <Route path="/cliente/pedido/pendente" element={<PedidoPendente />}></Route>
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ClienteProvider>
    </FeiranteProvider>
  );
}

export default App;
