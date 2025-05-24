
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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');

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


app.get('/pokemons/search', async (req, res) => {

    //criando uma constante que receberá um request percorrendo toda a API
    const { name, type } = req.query;

    try {


        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
        let filtro = response.data.results

        //no caso do usuário solicitar o nome, ele irá filtrar os nomes apenas
        if (name) {
            filtro = filtro.filter(p => p.name.includes(name.toLowerCase()))
        }

        //no caso do tipo será diferente:
        if (type) {

            //primeiro receberá uma lista para armazenar todos os tipos
            const filtroTipo = []


            // nesse for é criado uma constante poke que irá percorrer todos os filtros em busca do filtro resquisitado
            for (const poke of filtro) {

                // vai amarzenar os filtro que foram solicitados e puxados da url da api
                const pokeDado = await axios.get(poke.url);

                // essa constante irá receber a os dados da constante anterior percorrendo a lista e criando uma nova (utilizando o map) 
                const types = pokeDado.data.types.map(t => t.type.name)

                // caso o tipo esteja incluso ele é puxado (Adicionado) na lista inicial filtroTipo()
                if (types.includes(type.toLowerCase())) {
                    filtroTipo.push(poke)
                }
            }

            // variavell filtro recebe a lista.
            filtro = filtroTipo
        }

        //precisa disso para devolver a resposta em JSON
        res.json(filtro)

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pokémons filtrados' });
    }
});


//TERCEIRO PASSO: EVOLUÇÃO DOS POKEMONS
//htpps://localhost:30000/pokemons/eevee/evolution

app.get('/pokemons/:name/evolution', async (req, res) => {

    // é uma constante dinamica e por isso é dessa forma, no caso na url no nome "name" será o nome do pokemon
    const { name } = req.params


    try {

        //percorrendo a api de evolução por nome - quando é injetada uma variavel numa string utiliza a crase
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)

        //armazena os dados percorridos
        const evolucaoPoke = response.data.evolution_chain.url //na api para as evoluções a propriedade correta é evolution_chain

        //percorre os dados da cadeia evolutiva
        const evoResponse = await axios.get(evolucaoPoke)

        // retorna os dados em JSon
        res.json(evoResponse.data)

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar evolução do pokémon' });
    }

});


app.post('/team', (req, res) => {
    const { pokemon } = req.body;

    if (team.length >= 5) {
        return res.status(400).json({ error: 'O time já tem 5 pokémons' });
    }

    if (team.some(p => p.name === pokemon.name)) {
        return res.status(400).json({ error: 'Esse pokémon já está no time' });
    }

    team.push(pokemon);
    res.json({ team });
});

app.get('/team', (req, res) => {
    res.json({ team });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
