import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

import Box from '@mui/material/Box';

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

    return (
        <>
            {servicos.length > 0 && (
                <Box>
                    <h1>Serviços Disponíveis</h1>
                    <center>
                    <img src="./src/img/Impressora.png" alt="Icone de Impressora"/>
                    <img src="./src/img/Livro.png" alt="Icone de Livro"/>
                    <img src="./src/img/Paleta.png" alt="Icone de Paleta de Cores"/>
                    <p>Sistema para a solicitação de pedidos de serviços gerais voltados
                        ao ambiente acadêmico, buscando facilitar os processos, automatizando
                        pedidos e melhorando o acesso as atividades da faculdade. 
                    </p>
                    <p>É possível pedir por impressões, criação de artes visuais, empréstimo de livros
                        (digital ou físico), aluguel de equipamentos e até encomenda de lanches...
                    </p>
                    <h2>Pedir Agora!</h2>
                    </center>
                </Box>
            )}
        </>
    );
}