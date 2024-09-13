class RecintosZoo {
    constructor() {
        this.recintos = [
            {
                numero: 1,
                bioma: 'savana',
                tamanhoTotal: 10,
                animaisExistentes: [{ especie: 'macaco', quantidade: 3, tamanho: 1 }]
            },
            {
                numero: 2,
                bioma: 'floresta',
                tamanhoTotal: 5,
                animaisExistentes: []
            },
            {
                numero: 3,
                bioma: 'savana e rio',
                tamanhoTotal: 7,
                animaisExistentes: [{ especie: 'gazela', quantidade: 1, tamanho: 2 }]
            },
            {
                numero: 4,
                bioma: 'rio',
                tamanhoTotal: 8,
                animaisExistentes: []
            },
            {
                numero: 5,
                bioma: 'savana',
                tamanhoTotal: 9,
                animaisExistentes: [{ especie: 'leao', quantidade: 1, tamanho: 3 }]
            }
        ];

        this.animais = [
            { especie: 'leao', tamanho: 3, biomas: ['savana'], dieta: 'carnivoro' },
            { especie: 'leopardo', tamanho: 2, biomas: ['savana'], dieta: 'carnivoro' },
            { especie: 'crocodilo', tamanho: 3, biomas: ['rio', 'savana e rio'], dieta: 'carnivoro' },
            { especie: 'macaco', tamanho: 1, biomas: ['savana', 'floresta', 'savana e rio'], dieta: 'herbivoro' },
            { especie: 'gazela', tamanho: 2, biomas: ['savana', 'savana e rio'], dieta: 'herbivoro' },
            { especie: 'hipopotamo', tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], dieta: 'herbivoro' }
        ];
    }

    analisaRecintos(animal, quantidade) {
        let animalInfo = this.animais.find(a => a.especie === animal.toLowerCase());
        if (!animalInfo) {
            return { erro: "Animal inválido"};
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida"};
        }

        let recintosViaveis = [];
        this.recintos.forEach(recinto => {
            if (animalInfo.biomas.includes(recinto.bioma)) {
                let conflitoDieta = false;
                let espacoOcupado = 0;
                let necessitaEspacoExtra = false;

                recinto.animaisExistentes.forEach(animalExistente => {
                    let animalExistenteInfo = this.animais.find(a => a.especie === animalExistente.especie);
                    if (animalExistenteInfo) {
                        // Verifica se há conflito de dieta
                        if (animalExistenteInfo.dieta !== animalInfo.dieta) {
                            if (animalInfo.dieta === 'carnivoro' || animalExistenteInfo.dieta === 'carnivoro') {
                                conflitoDieta = true;
                            }
                        } else if (animalInfo.dieta === 'carnivoro' && animalExistenteInfo.especie !== animalInfo.especie) {
                            conflitoDieta = true;
                        }

                        // Verifica se o hipopótamo está em bioma adequado
                        if (animalExistenteInfo.especie === 'hipopotamo' && !recinto.bioma.includes('savana e rio')) {
                            conflitoDieta = true;
                        }

                        espacoOcupado += animalExistente.quantidade * animalExistente.tamanho;
                        if (recinto.animaisExistentes.length > 0 && animalExistente.especie !== animalInfo.especie) {
                            necessitaEspacoExtra = true;
                        }
                    }
                });

                if (conflitoDieta) {
                    return; // Pular para o próximo recinto
                }

                if (animalInfo.especie === 'macaco' && quantidade === 1) {
                    if (recinto.animaisExistentes.length === 0) {
                        return;
                    }
                }

                let espacoRestante = recinto.tamanhoTotal - espacoOcupado;
                let espacoNecessario = quantidade * animalInfo.tamanho;

                if (necessitaEspacoExtra) {
                    espacoRestante -= 1; // Espaço extra para múltiplas espécies
                }

                if (espacoRestante >= espacoNecessario) {
                    recintosViaveis.push({
                        numero: recinto.numero,
                        espacoLivre: espacoRestante - espacoNecessario,
                        espacoTotal: recinto.tamanhoTotal
                    });
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável"};
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return { erro: null, recintosViaveis: recintosViaveis.map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`) };
    }
}

export { RecintosZoo };
