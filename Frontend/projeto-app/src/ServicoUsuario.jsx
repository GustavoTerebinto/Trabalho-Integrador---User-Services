import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import { Box, Grid}  from '@mui/material';

export default function ServicoUsuario({reload}) {
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

    return (
        <>
            {servicos.length > 0 && (
                <Box>
                    {servicos.map((servico) => (
                        <Box
                            key={servico.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <Grid className="Index-services">
                                <center>
                                    <h3>{servico.nome}</h3>
                                    <p>Código do Serviço:{servico.id}</p>
                                    <p>{servico.descricao}</p>
                                </center>
                            </Grid>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
}