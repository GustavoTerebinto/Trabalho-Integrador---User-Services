import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function DadoUsuario({userEmail, reload}) {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');

    const buscaUsuarioEmail = async () => {
        try{
            const response = await axios.get(`http://localhost:3002/usuario/email/${userEmail}`);
            console.log(response);
            setUsuarioId(response.data.usuario.id);
        } catch(error){
            console.log(error);
        }
    }

    const buscaUsuarioId = async (usuarioId) => {
        try{
            const response = await axios.get(`http://localhost:3002/usuario/${usuarioId}`);
            console.log(response);
            setUsuarios(response.data);
            setUsuarioId('');
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        buscaUsuarioEmail();
    }, [reload]);

    useEffect(() => {
        if (usuarioId) {
            buscaUsuarioId(usuarioId);
        }
    }, [usuarioId, reload]);

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
            <h1>Editar Dados</h1>
                <TableContainer component={Paper} sx={{ mt: 5, mb: 5}}>
                    <Table aria-label="lista de usuários">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Tipo</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                <TableRow 
                                    key={usuarios.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{usuarios.id}</TableCell>
                                    <TableCell>{usuarios.nome}</TableCell>
                                    <TableCell>{usuarios.email}</TableCell>
                                    <TableCell>{usuarios.tipo}</TableCell>
                                </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

        </>
    );
}