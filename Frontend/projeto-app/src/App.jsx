import { useState, useEffect } from "react";
import Index from "./Index";
import Dashboard from "./Dashboard";
import Usuario from "./Usuario";
import DadoUsuario from "./DadoUsuario";
import Servico from "./Servico";
import ServicoUsuario from "./ServicoUsuario";
import Ordem from "./Ordem";
import OrdemUsuario from "./OrdemUsuario";
import Login from "./Login";
import axios from "axios";
import './App.css';

import { Box, TextField, Stack, Button, Grid, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {Snackbar, Alert, AlertTitle} from '@mui/material'
import {teal} from '@mui/material/colors';

//Cores da Tela
const tealColor = teal[900];
const tealColor2 = teal[300];
const tealColor3 = teal[100];

export default function App() {
  //Views
  const [viewVerIndex, setViewVerIndex] = useState(true);
  const [viewVerUsuarios, setViewVerUsuarios] = useState(false);
  const [viewVerDadoUsuario, setViewVerDadoUsuario] = useState(false);
  const [viewVerServicosUsuario, setViewVerServicosUsuario] = useState(false);
  const [viewVerServicos, setViewVerServicos] = useState(false);
  const [viewVerOrdens, setViewVerOrdens] = useState(false);
  const [viewVerOrdensUsuario, setViewVerOrdensUsuario] = useState(false);
  const [viewServicosFormAdd, setViewServicosFormAdd] = useState(false);
  const [viewServicosFormAtt, setViewServicosFormAtt] = useState(false);
  const [viewServicosFormDel, setViewServicosFormDel] = useState(false);

  //Entradas
  const [entradaUsuarioId, setEntradaUsuarioId] = useState('');
  const [entradaUsuarioNome, setEntradaUsuarioNome] = useState('');
  const [entradaServicoNome, setEntradaServicoNome] = useState('');
  const [entradaServicoDescricao, setEntradaServicoDescricao] = useState('');
  const [entradaServicoCodigo, setEntradaServicoCodigo] = useState('');
  const [entradaServicoId, setEntradaServicoId] = useState('');
  const [entradaOrdemEstado, setEntradaOrdemEstado] = useState('');
  const [entradaOrdemId, setEntradaOrdemId] = useState('');
  const [entradaOrdemNome, setEntradaOrdemNome] = useState('');
  const [entradaOrdemDescricao, setEntradaOrdemDescricao] = useState('');
  const [entradaOrdemIdUsuario, setEntradaOrdemIdUsuario] = useState('');
  const [entradaOrdemIdServico, setEntradaOrdemIdServico] = useState('');
  const [entradaOrdemIdDel, setEntradaOrdemIdDel] = useState('');

  //Aviso
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [permissoes, setPermissoes] = useState([]);

  const [reload, setReload] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				if (payload.username) {
					setUserEmail(payload.username);
					setIsLoggedIn(true);
				}
			} catch (error) {
				console.error("Erro ao decodificar token:", error);
				localStorage.removeItem("token");
			}
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn && userEmail) {
			buscarPermissoesPorEmail(userEmail);
		}
	}, [isLoggedIn, userEmail]);


	const buscarPermissoesPorEmail = async (email) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`http://localhost:3002/usuario-permissao/usuario/${email}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(response.data.permissoes);
			setPermissoes(response.data.permissoes);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogin = (success, username = null) => {
		if (success) {
			if (username) {
				setUserEmail(username);
			} else {
				try {
					const token = localStorage.getItem("token");
					if (token) {
						const payload = JSON.parse(atob(token.split(".")[1]));
						if (payload.username) {
							setUserEmail(payload.username);
						}
					}
				} catch (error) {
					console.error("Erro ao decodificar token:", error);
				}
			}
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
			setUserEmail("");
			localStorage.removeItem("token");
		}
	};

  //Permissões
	const podeVisualizarUsuarios = permissoes.some(permissao => permissao.Permissao.descricao ==="VISUALIZAR_USUARIOS");
	const podeVisualizarServicos = permissoes.some(permissao => permissao.Permissao.descricao ==="VISUALIZAR_SERVIÇOS");
	const podeVisualizarOrdens = permissoes.some(permissao => permissao.Permissao.descricao ==="VISUALIZAR_ORDENS");

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUserEmail("");
		setPermissoes([]);
		localStorage.removeItem("token");
	};
  
  //Controladores das Views
  const controlViewVerIndex = () => {
    if (viewVerIndex == false){
      setViewVerIndex(!viewVerIndex);
    }
    setViewVerServicos(false);
    setViewVerOrdens(false);
    setViewVerUsuarios(false);
    setViewVerServicosUsuario(false);
    setViewVerOrdensUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerUsuarios = () => {
    if (viewVerUsuarios == false){
      setViewVerUsuarios(!viewVerUsuarios);
    }
    setViewVerServicos(false);
    setViewVerOrdens(false);
    setViewVerIndex(false);
    setViewVerServicosUsuario(false);
    setViewVerOrdensUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerServicos = () => {
    if (viewVerServicos == false){
      setViewVerServicos(!viewVerServicos);
    }
    setViewVerUsuarios(false);
    setViewVerOrdens(false);
    setViewVerIndex(false);
    setViewVerServicosUsuario(false);
    setViewVerOrdensUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerOrdens = () => {
    if (viewVerOrdens == false){
      setViewVerOrdens(!viewVerOrdens);
    }
    setViewVerServicos(false);
    setViewVerUsuarios(false);
    setViewVerIndex(false);
    setViewVerServicosUsuario(false);
    setViewVerOrdensUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerServicosUsuario = () => {
    if (viewVerServicosUsuario == false){
      setViewVerServicosUsuario(!viewVerServicosUsuario);
    }
    setViewVerServicos(false);
    setViewVerOrdens(false);
    setViewVerUsuarios(false);
    setViewVerIndex(false);
    setViewVerServicos(false);
    setViewVerOrdensUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerOrdensUsuario = () => {
    if (viewVerOrdensUsuario == false){
      setViewVerOrdensUsuario(!viewVerOrdensUsuario);
    }
    setViewVerServicos(false);
    setViewVerOrdens(false);
    setViewVerUsuarios(false);
    setViewVerIndex(false);
    setViewVerServicos(false);
    setViewVerServicosUsuario(false);
    setViewVerDadoUsuario(false);
  }

  const controlViewVerDadoUsuario = () => {
    if (viewVerDadoUsuario == false){
      setViewVerDadoUsuario(!viewVerDadoUsuario);
    }
    setViewVerServicos(false);
    setViewVerOrdens(false);
    setViewVerUsuarios(false);
    setViewVerIndex(false);
    setViewVerServicos(false);
    setViewVerServicosUsuario(false);
    setViewVerOrdensUsuario(false);
  }

  const controlViewServicosFormAdd = () => {
    setViewServicosFormAdd(!viewServicosFormAdd);
    setViewServicosFormAtt(false);
    setViewServicosFormDel(false);
  }

  const controlViewServicosFormAtt = () => {
    setViewServicosFormAtt(!viewServicosFormAtt);
    setViewServicosFormAdd(false);
    setViewServicosFormDel(false);
  }

  const controlViewServicosFormDel = () => {
    setViewServicosFormDel(!viewServicosFormDel);
    setViewServicosFormAtt(false);
    setViewServicosFormAdd(false);
  }

  //Funções CRUD
  const delUsuario = async () => {
    const response = await axios.delete(`http://localhost:3002/usuario/${entradaUsuarioId}`);
    console.log(response);
    setEntradaUsuarioId('');
    setReload(!reload);
    setSnackbarMessage('Usuário Deletado!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const attUsuario = async () => {
    const response = await axios.put(`http://localhost:3002/usuario/${entradaUsuarioId}`, {nome: entradaUsuarioNome});
    console.log(response);
    setEntradaUsuarioId('');
    setEntradaUsuarioNome('');
    setReload(!reload);
    setSnackbarMessage('Dados Atualizados!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const addServico = async () => {
    const response = await axios.post("http://localhost:3002/servico/", {nome: entradaServicoNome, descricao: entradaServicoDescricao, cod: entradaServicoCodigo});
    console.log(response);
    setEntradaServicoNome('');
    setEntradaServicoDescricao('');
    setEntradaServicoCodigo('');
    setReload(!reload);
    setSnackbarMessage('Serviço Adicionado!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const attServico = async () => {
    const response = await axios.put(`http://localhost:3002/servico/${entradaServicoId}`, {nome: entradaServicoNome, descricao: entradaServicoDescricao, cod: entradaServicoCodigo});
    console.log(response);
    setEntradaServicoId('');
    setEntradaServicoNome('');
    setEntradaServicoDescricao('');
    setEntradaServicoCodigo('');
    setReload(!reload);
    setSnackbarMessage('Serviço Atualizado!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const delServico = async () => {
    const response = await axios.delete(`http://localhost:3002/servico/${entradaServicoId}`);
    console.log(response);
    setEntradaServicoId('');
    setReload(!reload);
    setSnackbarMessage('Serviço Deletado!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const attOrdem = async () => {
    const response = await axios.put(`http://localhost:3002/ordem/${entradaOrdemId}`, {estado: entradaOrdemEstado});
    console.log(response);
    setEntradaOrdemEstado('');
    setEntradaOrdemId('');
    setReload(!reload);
    setSnackbarMessage('Ordem Atualizada!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const delOrdem = async () => {
    const response = await axios.delete(`http://localhost:3002/ordem/${entradaOrdemIdDel}`);
    console.log(response);
    setEntradaOrdemIdDel('');
    setReload(!reload);
    setSnackbarMessage('Ordem Deletada!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }

  const addOrdem = async () => {
    const response = await axios.post("http://localhost:3002/ordem/", {nome: entradaOrdemNome, descricao: entradaOrdemDescricao, id_usuario: entradaOrdemIdUsuario, id_servico: entradaOrdemIdServico, estado: "em espera"});
    console.log(response);
    setEntradaOrdemNome('');
    setEntradaOrdemDescricao('');
    setEntradaOrdemIdUsuario('');
    setEntradaOrdemIdServico('');
    setReload(!reload);
    setSnackbarMessage('Pedido Solicitado!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  }
  
  //Tela Login
	if (!isLoggedIn) {
		return (
			<Box
        className="Login"
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Stack spacing={2} alignItems="center">
					<Typography variant="h4" component="h1">
						Login
					</Typography>
					<Login handleLogin={handleLogin} />
				</Stack>
			</Box>
		);
	}

  return (
    <Box>
      <Grid container sx={{bgcolor: tealColor}}>
        <Grid item size={2}>
          <Button variant="contained" onClick={controlViewVerIndex} className="Button-main"><HomeIcon/>Página Inicial</Button>
        </Grid>
        <Grid item size={8} className="Grid">
          <Typography sx={{ flexGrow: 1 }} className="Typography">
            Usuário: {userEmail}
          </Typography>
        </Grid>
        <Grid item size={2} sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: 2}} className="Grid">
          <Button
            className="Button-delete"
            variant="outlined"
            onClick={handleLogout}
            style={{ width: "150px" }}
          >
            <LogoutIcon/>Deslogar
          </Button>
        </Grid>
      </Grid>

      <Box>
        <Grid container>

          {/* Menu Lateral */}
          <Grid size="grow" sx={{bgcolor: tealColor2, pb: "45%"}}>
            {podeVisualizarUsuarios &&
              <Stack padding={2} direction="row">
                <Button variant="contained" onClick={controlViewVerUsuarios} className="Button-admin">Listar/Deletar Usuários</Button>
              </Stack>
            }
            {podeVisualizarServicos &&
              <Stack padding={2} direction="row">
                <Button variant="contained" onClick={controlViewVerServicos} className="Button-admin">Listar/Editar Serviços</Button>
              </Stack>
            }
            {podeVisualizarOrdens &&
              <Stack padding={2} direction="row">
                <Button variant="contained" onClick={controlViewVerOrdens} className="Button-admin">Listar/Atualizar Ordens de Serviço</Button>
              </Stack>
            }
            <Stack padding={2} direction="row">
              <Button variant="contained" onClick={controlViewVerServicosUsuario} className="Button">Solicitar Serviço</Button>
            </Stack>
            <Stack padding={2} direction="row">
              <Button variant="contained" onClick={controlViewVerOrdensUsuario} className="Button">Minhas Ordens de Serviço</Button>
            </Stack>
            <Stack padding={2} direction="row">
              <Button variant="contained" onClick={controlViewVerDadoUsuario} className="Button">Editar Dados</Button>
            </Stack>
          </Grid>

          {/*Tela Princípal*/}
          <Grid size={8} sx={{bgcolor: tealColor3}}>
            <Grid size="grow"></Grid>
            <Grid size={8} sx={{ml: "16%"}}>
              {viewVerIndex && <Index reload={reload}/>}
              {viewVerIndex && 
                <Stack padding={2} direction="row" className="Stack">
                  <Button variant="contained" onClick={controlViewVerServicosUsuario} className="Button">Solicitar Serviço</Button>
                </Stack>
              }
              {viewVerIndex && <Dashboard reload={reload}/>}
              {viewVerUsuarios && <Usuario reload={reload}/>}
              {viewVerUsuarios && <>
               <h2>Deletar Usuário</h2>
                <Stack className="Stack">
                  <Box className="Box">
                    <TextField
                      className="TextField" 
                      id="outlined-basic" 
                      label="Id" 
                      variant="outlined"
                      type="text"
                      placeholder="Digite aqui..."
                      value={entradaUsuarioId}
                      onChange={(event) => setEntradaUsuarioId(event.target.value)}
                    />
                  </Box>
                  <Stack direction="row" className="Stack">
                    <Button variant="contained" endIcon={<DeleteIcon />} onClick={delUsuario} className="Button-delete">Deletar</Button>
                  </Stack>
                </Stack>
              </>}
              {viewVerServicos && <Servico reload={reload}/>}
              {viewVerServicos && <>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6}>
                    <Stack padding={2} direction="row">
                      <Button variant="contained" onClick={controlViewServicosFormAdd} className="Button">Adicionar Serviços</Button>
                    </Stack>
                    <Stack padding={2} direction="row">
                      <Button variant="contained" onClick={controlViewServicosFormAtt} className="Button-atualize">Atualizar Serviços</Button>
                    </Stack>
                    <Stack padding={2} direction="row">
                      <Button variant="contained" onClick={controlViewServicosFormDel} className="Button-delete">Deletar Serviços</Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    {viewServicosFormAdd && <>
                      <h2>Adicionar Serviços</h2>
                      <Stack padding={2} className="Stack">
                        <Box sx={{ p:2 }}>
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Nome" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoNome}
                            onChange={(event) => setEntradaServicoNome(event.target.value)}
                          />
                        </Box>
                        <Box sx={{ p:2 }}>
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Descrição" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoDescricao}
                            onChange={(event) => setEntradaServicoDescricao(event.target.value)}
                          />
                        </Box>
                        <Box sx={{ p:2 }}>
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Código" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoCodigo}
                            onChange={(event) => setEntradaServicoCodigo(event.target.value)}
                          />
                        </Box>
                        <Stack padding={2} direction="row" className="Stack">
                          <Button variant="contained" endIcon={<SendIcon />} onClick={addServico} className="Button">Adicionar</Button>
                        </Stack>
                      </Stack>
                    </>}
                    {viewServicosFormAtt && <>
                      <h2>Atualizar Serviço</h2>
                      <Stack className="Stack">
                        <Box className="Box">
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Id" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoId}
                            onChange={(event) => setEntradaServicoId(event.target.value)}
                          />
                        </Box>
                        <Box className="Box">
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Nome" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoNome}
                            onChange={(event) => setEntradaServicoNome(event.target.value)}
                          />
                        </Box>
                        <Box className="Box">
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Descrição" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoDescricao}
                            onChange={(event) => setEntradaServicoDescricao(event.target.value)}
                          />
                        </Box>
                        <Box className="Box">
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Código" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoCodigo}
                            onChange={(event) => setEntradaServicoCodigo(event.target.value)}
                          />
                        </Box>
                        <Stack direction="row" className="Stack">
                          <Button variant="contained" endIcon={<SendIcon />} onClick={attServico} className="Button-atualize">Atualizar</Button>
                        </Stack>
                      </Stack>
                    </>}
                    {viewServicosFormDel && <>
                      <h2>Deletar Serviço</h2>
                      <Stack className="Stack">
                        <Box className="Box">
                          <TextField
                            className="TextField" 
                            id="outlined-basic" 
                            label="Id" 
                            variant="outlined"
                            type="text"
                            placeholder="Digite aqui..."
                            value={entradaServicoId}
                            onChange={(event) => setEntradaServicoId(event.target.value)}
                          />
                        </Box>
                        <Stack direction="row" className="Stack">
                          <Button variant="contained" endIcon={<DeleteIcon />} onClick={delServico} className="Button-delete">Deletar</Button>
                        </Stack>
                      </Stack>
                    </>}
                  </Grid>
                </Grid>
              </>}
              {viewVerOrdens && <Ordem reload={reload}/>}
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6}>
                  {viewVerOrdens && <>
                    <h2>Atualizar Ordem</h2>
                    <Stack>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Id" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemId}
                          onChange={(event) => setEntradaOrdemId(event.target.value)}
                        />
                      </Box>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Estado" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemEstado}
                          onChange={(event) => setEntradaOrdemEstado(event.target.value)}
                        />
                      </Box>
                      <Stack direction="row" className="Stack">
                        <Button variant="contained" endIcon={<SendIcon />} onClick={attOrdem} className="Button-atualize">Atualizar</Button>
                      </Stack>
                    </Stack>
                  </>}
                </Grid>
                <Grid item xs={6}>
                  {viewVerOrdens && <>
                    <h2>Deletar Ordem</h2>
                    <Stack>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Id" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemIdDel}
                          onChange={(event) => setEntradaOrdemIdDel(event.target.value)}
                        />
                      </Box>
                      <Stack direction="row" className="Stack">
                        <Button variant="contained" endIcon={<DeleteIcon />} onClick={delOrdem} className="Button-delete">Deletar</Button>
                      </Stack>
                    </Stack>
                  </>}
                </Grid>
              </Grid>
              {viewVerServicosUsuario && <h1>Solicitar Serviços</h1>}
              <Grid container spacing={2} justifyContent="center">
                <Grid item size={6}>
                  {viewVerServicosUsuario && <ServicoUsuario reload={reload}/>}
                </Grid>
                <Grid item size={6}>
                  {viewVerServicosUsuario &&<>
                    <Stack className="Stack">
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Nome" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemNome}
                          onChange={(event) => setEntradaOrdemNome(event.target.value)}
                        />
                      </Box>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Descrição" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemDescricao}
                          onChange={(event) => setEntradaOrdemDescricao(event.target.value)}
                        />
                      </Box>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Id de Usuário" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemIdUsuario}
                          onChange={(event) => setEntradaOrdemIdUsuario(event.target.value)}
                        />
                      </Box>
                      <Box className="Box">
                        <TextField
                          className="TextField" 
                          id="outlined-basic" 
                          label="Id de Serviço" 
                          variant="outlined"
                          type="text"
                          placeholder="Digite aqui..."
                          value={entradaOrdemIdServico}
                          onChange={(event) => setEntradaOrdemIdServico(event.target.value)}
                        />
                      </Box>
                      <Stack direction="row" className="Stack">
                        <Button variant="contained" endIcon={<SendIcon />} onClick={addOrdem} className="Button">Solicitar</Button>
                      </Stack>
                    </Stack>
                  </>}
                </Grid>
              </Grid>
              {viewVerOrdensUsuario && <OrdemUsuario userEmail={userEmail} reload={reload}/>}
              {viewVerDadoUsuario && <DadoUsuario userEmail={userEmail} reload={reload}/>}
              {viewVerDadoUsuario && <>
                <h2>Atualizar Dados</h2>
                <Stack className="Stack">
                  <Box className="Box">
                    <TextField
                      className="TextField" 
                      id="outlined-basic" 
                      label="Id" 
                      variant="outlined"
                      type="text"
                      placeholder="Digite aqui..."
                      value={entradaUsuarioId}
                      onChange={(event) => setEntradaUsuarioId(event.target.value)}
                    />
                  </Box>
                  <Box className="Box">
                    <TextField
                      className="TextField" 
                      id="outlined-basic" 
                      label="Nome" 
                      variant="outlined"
                      type="text"
                      placeholder="Digite aqui..."
                      value={entradaUsuarioNome}
                      onChange={(event) => setEntradaUsuarioNome(event.target.value)}
                    />
                  </Box>
                  <Stack direction="row" className="Stack">
                    <Button variant="contained" endIcon={<SendIcon />} onClick={attUsuario} className="Button-atualize">Atualizar</Button>
                  </Stack>
                </Stack>
              </>}
            </Grid>
            <Grid size="grow"></Grid>
          </Grid>

          <Grid size="grow" sx={{bgcolor: tealColor2}}></Grid>
        </Grid>
      </Box>

      {/* Notificação */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          <AlertTitle>
            {snackbarSeverity === 'success' ? 'Sucesso!' : 'Erro'}
          </AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}