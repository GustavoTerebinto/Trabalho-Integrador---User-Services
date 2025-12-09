import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Dashboard({reload}) {
    const [usuarios, setUsuarios] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [ordens, setOrdens] = useState([]);

    const buscaUsuarios = async () => {
        try{
            const response = await axios.get("http://localhost:3002/usuario/todos");
            console.log(response);
            setUsuarios(response.data.usuarios);
        } catch(error){
            console.log(error);
        }
    }

    const buscaServicos = async () => {
        try{
            const response = await axios.get("http://localhost:3002/servico/todos");
            console.log(response);
            setServicos(response.data.servico);
        } catch(error){
            console.log(error);
        }
    }

    const buscaOrdens = async () => {
        try{
            const response = await axios.get("http://localhost:3002/ordem/todos");
            console.log(response);
            setOrdens(response.data.ordens);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        buscaUsuarios();
        buscaServicos();
        buscaOrdens();
    }, [reload]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <>
            <h2>Dashboard</h2>
                <TableContainer component={Paper} sx={{ mt: 5, mb: 5}}>
                    <Table aria-label="lista de usuários">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Usuários Registrados</StyledTableCell>
                                <StyledTableCell align="center">Serviços Disponíveis</StyledTableCell>
                                <StyledTableCell align="center">Pedidos Solicitados</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow 
                                >
                                    <TableCell align="center">{usuarios.length}</TableCell>
                                    <TableCell align="center">{servicos.length}</TableCell>
                                    <TableCell align="center">{ordens.length}</TableCell>
                                </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
        </>
    );
}