import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import { useCookies } from "react-cookie";

import Header from "../components/Header"

const API_URL = import.meta.env.VITE_API_URL;

export default function Main() {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [apuntes, setApuntes] = useState("");

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tareas`, {
      headers: { Authorization: "Bearer " + cookie.token },
    })
    .then(res=>res.json())
    .then(res => {
      setTareas(res)
    })
  }, []);

  return (
    <>
      <Header />
      <Container>
      <Link to="/main/tarea" className="btn btn-success mt-5" >Nueva tarea</Link>
      <Table variant="dark" className="mt-1">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tareas.map(tarea => (
            <tr key={tarea.idTarea}>
              <td>{tarea.titulo}</td>
              <td>{tarea.fecha.substring(0,10)}</td>
              <td>{tarea.estado.nombre}</td>
              <td>{tarea.categoria.nombre}</td>
              <td className="text-end">
                <Button onClick={() => navigate(`/main/tarea/${tarea.idTarea}`)}>
                  Seleccionar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </>
  );
}