import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Usuario({reload}) {
    const [usuarios, setUsuarios] = useState([]);

    const buscaUsuarios = async () => {
        try{
            const response = await axios.get("http://localhost:3002/usuario/todos");
            console.log(response);
            setUsuarios(response.data.usuarios);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        buscaUsuarios();
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
            <h1>Listar ou Deletar Usuários</h1>
            {usuarios.length > 0 && (
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
                            {usuarios.map((usuario) => (
                                <TableRow 
                                    key={usuario.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{usuario.id}</TableCell>
                                    <TableCell>{usuario.nome}</TableCell>
                                    <TableCell>{usuario.email}</TableCell>
                                    <TableCell>{usuario.tipo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}