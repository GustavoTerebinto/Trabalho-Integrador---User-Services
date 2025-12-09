import { useState, useEffect } from "react";
import axios from "axios";

import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Servico({reload}) {
    const [servicos, setServicos] = useState([]);
    const buscaServicos = async () => {
        try{
            const response = await axios.get("http://localhost:3002/servico/todos");
            console.log(response);
            setServicos(response.data.servico);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        buscaServicos();
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
            <h1>Listar ou Editar Serviços</h1>
            {servicos.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 5, mb: 5}}>
                    <Table sx={{ minWidth: 300 }} aria-label="lista de serviços">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell>Descricao</StyledTableCell>
                                <StyledTableCell>Código</StyledTableCell>                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {servicos.map((servico) => (
                                <TableRow 
                                    key={servico.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{servico.id}</TableCell>
                                    <TableCell>{servico.nome}</TableCell>
                                    <TableCell>{servico.descricao}</TableCell>
                                    <TableCell>{servico.cod}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}