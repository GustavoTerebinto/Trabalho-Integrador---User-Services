import { useState, useEffect } from "react";
import axios from "axios";

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Ordem({userEmail, reload}) {
    const [ordens, setOrdens] = useState([]);
    const [usuario, setUsuario] = useState('');

    const buscaUsuarioEmail = async () => {
        try{
            const response = await axios.get(`http://localhost:3002/usuario/email/${userEmail}`);
            console.log(response);
            setUsuario(response.data.usuario.id);
        } catch(error){
            console.log(error);
        }
    }


    const buscaOrdens = async (usuario) => {
        try{
            const response = await axios.get(`http://localhost:3002/ordem/usuario/${usuario}`);
            console.log(response);
            setOrdens(response.data.ordens);
            setUsuario('');
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        buscaUsuarioEmail();
    }, [reload]);

    useEffect(() => {
        if (usuario) {
            buscaOrdens(usuario);
        }
    }, [usuario, reload]);

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
            <h1>Minhas Ordens de Serviço</h1>
            {ordens.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 5, mb: 5}}>
                    <Table sx={{ minWidth: 300 }} aria-label="lista de ordens">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell>Descricao</StyledTableCell>
                                <StyledTableCell>Estado</StyledTableCell>
                                <StyledTableCell>Serviço</StyledTableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordens.map((ordem) => (
                                <TableRow 
                                    key={ordem.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{ordem.id}</TableCell>
                                    <TableCell>{ordem.nome}</TableCell>
                                    <TableCell>{ordem.descricao}</TableCell>
                                    <TableCell>{ordem.estado}</TableCell>
                                    <TableCell>{ordem.id_servico}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}