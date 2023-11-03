import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Button, Navbar, Nav } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };

  return (
    // <header>
    //   <Navbar bg="success" data-bs-theme="dark" variant="tabs">
    //     <Container>
    //       <Navbar.Brand href="/main">Gestor de tareas</Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Item>
    //           <Link to="/main" className="nav-link me-3">Mis Tareas</Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Link to="/config"className="nav-link me-3">Configuración</Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Button variant="danger" onClick={logout}>
    //             Cerrar Sesión
    //           </Button>
    //         </Nav.Item>
    //       </Nav>
    //     </Container>
    //   </Navbar>
    // </header>

    <header>
      <Navbar bg="success" expand="lg" data-bs-theme="dark" variant="tabs">
        <Container>
          <Navbar.Brand href="/main">Gestor de tareas</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link
                  to="/main"
                  className="nav-link text-white text-decoration-none"
                >
                  Mis Tareas
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/config"
                  className="nav-link text-white text-decoration-none"
                >
                  Configuración
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="danger" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
