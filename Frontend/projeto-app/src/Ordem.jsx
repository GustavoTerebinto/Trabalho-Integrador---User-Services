import { useState, useEffect } from "react";
import axios from "axios";

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Ordem({reload}) {
    const [ordens, setOrdens] = useState([]);
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
            <h1>Listar ou Atualizar Ordens de Serviço</h1>
            {ordens.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 5, mb: 5}}>
                    <Table sx={{ minWidth: 300 }} aria-label="lista de ordens">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell>Descricao</StyledTableCell>
                                <StyledTableCell>Estado</StyledTableCell>
                                <StyledTableCell>Usuário</StyledTableCell>
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
                                    <TableCell>{ordem.id_usuario}</TableCell>
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