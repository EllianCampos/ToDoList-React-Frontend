import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Row, Form, FormGroup, Button, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Index() {
  const [mode, setMode] = useState("singin" | "singup");
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === 0) {
      fetch(`${API_URL}/usuarios/singin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else if (res.status === 401) {
            setOnError(true)
            setErrorMessage("Acceso denegado")
          }
        })
        .then((res) => {
          setCookie("token", res.token);
          navigate("/main")
        });
    } else {
      fetch(`${API_URL}/usuarios/singup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          correo: email,
          contrasena: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.resultado) {
            Swal.fire(res.mensaje);
            setErrorMessage("");
            setOnError(false);
            setMode(0);
          } else {
            setErrorMessage(res.mensaje);
            setOnError(true);
          }
        });
    }
  };

  return (
    <>
      <header className="bg-success text-light p-3">
        <Row>
          <Col>
            <h1 className="text-center">Gestor de tareas</h1>
          </Col>
          <Col className="text-center">
            <Button
              className="btn btn-primary mt-2 ms-auto"
              onClick={() => {
                setMode(mode  == 1 ? 0 : 1);
                setOnError(false);
                setErrorMessage("");
              }}
            >
              {mode == 1 ? "Iniciar Sesión" : "Registrarme"}
            </Button>
          </Col>
        </Row>
      </header>
      <main className="container">
        <Form
          style={{ width: "300px" }}
          className="ms-auto me-auto mt-5"
          onSubmit={handleSubmit}
        >
          {onError === true ? (
            <Alert variant="danger">{errorMessage}</Alert>
          ) : (
            ""
          )}
          {mode == 1 ? (
            <FormGroup>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormGroup>
          ) : (
            ""
          )}
          <Form.Group className="mt-2">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <FormGroup className="mt-2">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Form.Control
              type="submit"
              value={mode == 1 ? "Registrarme" : "Ingresar"}
              className="btn btn-success"
            />
          </FormGroup>
        </Form>
      </main>
    </>
  );
}