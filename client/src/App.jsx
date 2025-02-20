import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Chats } from "./pages/Chats";
import { Header } from "./components/Header";
import { Create } from "./pages/Create";
import { Login } from "./pages/Login";
import "./styles/App.css";
import { Password } from "./pages/Password";

function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem("user");

  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/password/:chatId"
          element={<PrivateRoute element={<Password />} />}
        />
        <Route
          path="/chat/:chatId"
          element={<PrivateRoute element={<Chat />} />}
        />
        <Route path="/chats" element={<PrivateRoute element={<Chats />} />} />
        <Route path="/crear" element={<PrivateRoute element={<Create />} />} />
        <Route path="*" element={<h1>Not found 404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
