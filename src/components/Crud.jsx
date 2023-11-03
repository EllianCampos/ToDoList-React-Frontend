import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Crud({ title, route }) {
  const [cookie, setCookie] = useCookies(["token"]);

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const response = await fetch(`${API_URL}/${route}`, {
      headers: { Authorization: "Bearer " + cookie.token },
    });

    if (response.status === 200) {
      setData(await response.json());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() == "") {
      setOnError(true);
      setErrorMessage("Ingresa el nombre");
      return;
    }

    const response = await fetch(`${API_URL}/${route}/${editMode ? id : ""}`, {
      method: editMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.token,
      },
      body: JSON.stringify({
        nombre: name,
      }),
    });

    if (response.status === 200) {
      const res = await response.json();

      if (editMode) {
        const temp = [...data];
        const item = temp.find((item) => Object.values(item)[0] === id);
        item.nombre = res.nombre;
        setData(temp);
      } else {
        setData([...data, res]);
      }
    }

    setName("");
    setEditMode(false);
    setOnError(false);
    setErrorMessage("");
  };

  const handleDelete = async () => {
    const response = await fetch(`${API_URL}/${route}/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + cookie.token },
    });

    if (response.status === 200) {
      const temp = data.filter((item) => Object.values(item)[0] !== id);
      setData(temp);
      setName("");
      setEditMode(false);
    }
  };

  return (
    <Col xm={12} sm={6} className="mt-4">
      <h2>{title}</h2>
      <Form onSubmit={handleSubmit}>
        {onError ? <Alert variant="danger">{errorMessage}</Alert> : ""}
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          variant={editMode ? "warning" : "success"}
          type="submit"
          className="mt-2"
        >
          Guardar
        </Button>
        {editMode ? (
          <Button variant="danger" onClick={handleDelete} className="mt-2 ms-2">
            Eliminar
          </Button>
        ) : (
          ""
        )}
      </Form>
      <Table variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={Object.values(item)[0]}>
              <td>{item.nombre}</td>
              <td className="text-end">
                {editMode ? (
                  ""
                ) : (
                  <Button
                    onClick={() => {
                      setId(Object.values(item)[0]);
                      setName(item.nombre);
                      setEditMode(true);
                      setOnError(false);
                      setErrorMessage("");
                    }}
                  >
                    Seleccionar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}
