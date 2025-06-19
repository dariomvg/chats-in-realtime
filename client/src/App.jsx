import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Header } from "./components/Header";
import { Create } from "./pages/Create";
import { Login } from "./pages/Login";
import "./styles/App.css";
import { LayoutChats } from "./components/LayoutChats";
import { HomeChat } from "./pages/HomeChat";
import { Config } from "./pages/Config";
import { GlobalChats } from "./pages/GlobalChats";
import { useHandleUser } from "./contexts/ContextChat";

function PrivateRoute ({ element })  {
  const { username } = useHandleUser();
  return username ? element : <Navigate to="/registro/usuario" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/nuevo/chat"
          element={<PrivateRoute element={<Create />} />}
        />

        <Route
          path="/chats"
          element={<PrivateRoute element={<LayoutChats />} />}>
          <Route path="/chats" element={<HomeChat />} />
          <Route
            path="/chats/chat/:chatId"
            element={<PrivateRoute element={<Chat />} />}
          />
        </Route>

        <Route
          path="/global/chats"
          element={<PrivateRoute element={<GlobalChats />} />}
        />

        <Route
          path="/configuracion"
          element={<PrivateRoute element={<Config />} />}
        />

        <Route path="/registro/usuario" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
