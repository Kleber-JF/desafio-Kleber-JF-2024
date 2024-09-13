import { RecintosZoo } from './src/recintos-zoo.js'; // Ajuste o caminho conforme necessário
import readline from 'readline';

// Configura o readline para ler entrada do console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const zoo = new RecintosZoo();

function obterEntrada(pergunta) {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta);
        });
    });
}

async function main() {
    try {
        const animal = await obterEntrada('Digite o nome do animal: ');
        const quantidade = parseInt(await obterEntrada('Digite a quantidade: '), 10);

        const resultado = zoo.analisaRecintos(animal, quantidade);

        if (resultado.erro) {
            console.log(resultado.erro);
        } else {
            console.log('Recintos viáveis:');
            resultado.recintosViaveis.forEach(recinto => {
                console.log(recinto);
            });
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    } finally {
        rl.close();
    }
}

main();

