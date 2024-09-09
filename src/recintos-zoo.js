import { Recinto } from './recinto.js';
import { Animal } from './animal.js';

class RecintosZoo {
    constructor() {
        this.recintos = [
            new Recinto(1, 'savana', 10, [{ especie: 'macaco', quantidade: 3, tamanho: 1, biomas: ['savana'], carnivoro: false }]),
            new Recinto(2, 'floresta', 5),
            new Recinto(3, 'savana e rio', 7, [{ especie: 'gazela', quantidade: 1, tamanho: 2, biomas: ['savana'], carnivoro: false }]),
            new Recinto(4, 'rio', 8),
            new Recinto(5, 'savana', 9, [{ especie: 'leao', quantidade: 1, tamanho: 3, biomas: ['savana'], carnivoro: true }])
        ];

        this.animais = {
            leao: new Animal('leao', 3, ['savana'], true),
            leopardo: new Animal('leopardo', 2, ['savana'], true),
            crocodilo: new Animal('crocodilo', 3, ['rio'], true),
            macaco: new Animal('macaco', 1, ['savana', 'floresta'], false),
            gazela: new Animal('gazela', 2, ['savana'], false),
            hipopotamo: new Animal('hipopotamo', 4, ['savana', 'rio'], false)
        };
    }

    analisaRecintos(animalNome, quantidade) {
        const animal = this.animais[animalNome.toLowerCase()];

        if (!animal) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }
    
        const recintosViaveis = this.recintos
            .filter(recinto => 
                recinto.podeAdicionarAnimal(animal, quantidade)
            )
            .sort((a, b) => a.numero - b.numero)
            .map(recinto => { 
                const tamanhoOcupado = recinto.animais.reduce((total, a) => total + a.animal.tamanho * a.quantidade, 0);
                const espacoRestante = recinto.tamanhoTotal - tamanhoOcupado - (animal.tamanho * quantidade);

                const possuiOutroTipoAnimal = recinto.animais.length > 0 && !recinto.animais.some(a => a.animal.especie === animal.especie);

                const espacoAjustado = possuiOutroTipoAnimal ? espacoRestante - 1 : espacoRestante;

                return `Recinto ${recinto.numero} (espaço livre: ${espacoAjustado} total: ${recinto.tamanhoTotal})`;
            });
        
        if (recintosViaveis.length > 0) {
            return { erro: false, recintosViaveis };
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}

export { RecintosZoo as RecintosZoo };