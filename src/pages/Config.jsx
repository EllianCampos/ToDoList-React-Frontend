import { Col, Container, Row, Form, Button, Table, Alert } from "react-bootstrap";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Crud from "../components/Crud";

const API_URL = import.meta.env.VITE_API_URL;

export default function Config() {
 return (
    <>
      <Header />
      <Container>
        <Row>
          <Crud title="Estados" route="estados" />
          <Crud title="Categorias" route="categorias" />
        </Row>
      </Container>
    </>
  );
}
