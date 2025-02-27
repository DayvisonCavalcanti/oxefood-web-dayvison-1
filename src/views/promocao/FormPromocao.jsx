import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import MenuSistema from "../../MenuSistema";

export default function FormPromocao() {
  const [titulo, setTitulo] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();
  const [regra, setRegra] = useState();
  const [valorDesconto, setValorDesconto] = useState();

  const { state } = useLocation();
  const [idPromocao, setIdPromocao] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8081/api/promocao/" + state.id)
        .then((response) => {
          setIdPromocao(response.data.id);
          setTitulo(response.data.titulo);
          setDataInicio(response.data.dataInicio);
          setDataFim(formatarData(response.data.dataFim));
          setRegra(response.data.regra);
          setValorDesconto(response.data.valorDesconto);
        });
    }
  }, [state]);

  function salvar() {
    let promocaoRequest = {
      titulo: titulo,
      dataInicio: dataInicio,
      dataFim: dataFim,
      regra: regra,
      valorDesconto: valorDesconto,
    };

    if (idPromocao != null) {
      //Alteração:

      axios
        .put(
          "http://localhost:8081/api/promocao/" + idPromocao,
          promocaoRequest
        )
        .then((response) => {
          console.log("Promocao alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um promocao.");
        });
    } else {
      //Cadastro:

      axios
        .post("http://localhost:8081/api/promocao", promocaoRequest)
        .then((response) => {
          console.log("Promocao cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o promocao.");
        });
    }
  }

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  return (
    <div>
      <MenuSistema tela={"promocao"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idPromocao === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promocao &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idPromocao != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promocao &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  
                  fluid
                  label="Regra"
                  value={regra}
                  onChange={(e) => setRegra(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Input
                  
                  fluid
                  label="Valor Desconto (R$)"
                  value={valorDesconto}
                  onChange={(e) => setValorDesconto(e.target.value)}
                />

                <Form.Input required fluid label="A partir de">
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="Terminando em">
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
                as={Link}
                to={"/list-promocao"}
              >
                <Icon name="reply" />
                Voltar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
