
const express = require('express'); //cria o servidor
const axios = require('axios'); //busca informações da web (como de APIs)
const cors = require('cors'); //interligar o front com o back

const app = express(); //criando o servidor 
app.use(express.json()) //recebe os dados em JSON
app.use(cors()); // permitindo que o fron acesse o back


// lista que irá receber os pokemons selecionados
let time = [];



/*
    Primeiro passo: listar um limite de 100 pokemons 
    https://localhost:3000/pokemons
*/


// Quando o client solicita algo utilizando o caminho /pokemons ele vai eviar o pedido (request) e receberá uma resposta (response) -- o async é utilizando quando requisita algo da internet
app.get('/pokemons', async (req, res) => {
  try {
    
    // o const response é uma váriavel que irá receber a resposta.
    // await é utilizado para aguardar uma resposta requisitada da internet 
    // axios.get é solicitando a requisição dos pokemons da api
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
    
    // o res.json está enviando o dados recebidos no parametro (response.data - dados armazenados na variavel response) no formato de JSON que é entendido pelo front.
    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pokémons' });
  }
});

/**
    Segundo Passo: Filtrar os pokemons por nome e tipo
    Ex: http://localhost:3000/pokemons/search?name=char&type=fire
 */

app.get('/pokemons/search', async (req,res) => {
    const {name, type} = req.query;

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        let filtro = response.data.results

        if(name){
            filtro = filtro.filter(p.name.includes(name.toLowerCase()))
        }

    } catch (error) {
         res.status(500).json({ error: 'Erro ao buscar pokémons filtrados' });
    }
});
































const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
