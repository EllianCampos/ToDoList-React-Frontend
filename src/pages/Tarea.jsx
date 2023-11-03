import { Container, Form, FormGroup, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Tarea({ match }) {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [mode, setMode] = useState("create" | "edit");
  const [onError, setOnError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [apuntes, setApuntes] = useState("");

  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getEstados();
    getCategorias();
    if (id !== undefined) {
      getTarea();
      setMode(1);
    }
  }, []);

  const getEstados = async () => {
    const response = await fetch(`${API_URL}/estados`, {
      headers: { Authorization: "Bearer " + cookie.token },
    });

    if (response.status === 200) {
      setEstados(await response.json());
    }
  };

  const getCategorias = async () => {
    const response = await fetch(`${API_URL}/categorias`, {
      headers: { Authorization: "Bearer " + cookie.token },
    });

    if (response.status === 200) {
      setCategorias(await response.json());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() == "") {
      setOnError(true);
      setErrorMessage("Ingresa el título de la tarea");
      return;
    } else if (date == "") {
      setOnError(true);
      setErrorMessage("Marca la fecha en que debes completar la tarea");
    } else if (estado == "") {
      setOnError(true);
      setErrorMessage("Selecciona el estado actual de la tarea");
    } else if (categoria == "") {
      setOnError(true);
      setErrorMessage("Elige una categoría para la tarea");
    } else {
      setOnError(false);
      setErrorMessage("");
    }

    fetch(`${API_URL}/tareas${mode == 0 ? "" : "/" + id}`, {
      method: mode == 0 ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.token,
      },
      body: JSON.stringify({
        titulo: title,
        fecha: date,
        idEstado: estado,
        idCategoria: categoria,
        apuntes: apuntes,
      }),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/main");
      }
    });
  };

  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + cookie.token,
      },
    });

    if (response.status === 200) {
      navigate("/main");
    }
  };

  const getTarea = async () => {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      headers: { Authorization: "Bearer " + cookie.token },
    });
    if (response.status === 200) {
      const res = await response.json();
      setTitle(res.titulo);
      setDate(res.fecha.substring(0, 10));
      setEstado(res.estado.idEstado);
      setCategoria(res.categoria.idCategoria);
      setApuntes(res.apuntes);
    }
  };

  return (
    <>
      <Container>
        <h1>{mode == 0 ? "Crear tarea" : "Editar tarea"}</h1>
        <Form onSubmit={handleSubmit}>
          {onError ? <Alert variant="danger">{errorMessage}</Alert> : ""}
          <FormGroup>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
            >
              <option>Selecciona un estado</option>
              {estados.map((item) => (
                <option value={item.idEstado} key={item.idEstado}>
                  {item.nombre}
                </option>
              ))}
            </Form.Select>
          </FormGroup>
          <FormGroup>
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option>Selecciona una categoria</option>
              {categorias.map((item) => (
                <option value={item.idCategoria} key={item.idCategoria}>
                  {item.nombre}
                </option>
              ))}
            </Form.Select>
          </FormGroup>
          <FormGroup>
            <Form.Label>Apuntes</Form.Label>
            <Form.Control
              type="text"
              value={apuntes}
              onChange={(event) => setApuntes(event.target.value)}
              as="textarea"
              rows={5}
            />
          </FormGroup>
          <FormGroup className="mt-2 d-flex justify-content-between">
            <Button
              type="button"
              variant="warning"
              onClick={() => navigate("/main")}
            >
              Descartar
            </Button>
            <Button type="submit" variant="success">
              {mode == 0 ? "Crear tarea" : "Guardar cambios"}
            </Button>
            {mode == 1 ? (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            ) : (
              ""
            )}
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}
