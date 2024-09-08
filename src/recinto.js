import { Animal } from './animal.js';

class Recinto {
    constructor(numero, bioma, tamanhoTotal, animais = []) {
        this.numero = numero;
        this.bioma = bioma;
        this.tamanhoTotal = tamanhoTotal;
        this.animais = animais.map(a => ({
            animal: new Animal(a.especie, a.tamanho, a.biomas, a.carnivoro),
            quantidade: a.quantidade
        }));
    }

    espacoDisponivel() {
        const tamanhoOcupado = this.animais.reduce((total, a) => total + a.animal.tamanho * a.quantidade, 0);
        return this.tamanhoTotal - tamanhoOcupado;
    }
    

    podeAdicionarAnimal(animal, quantidade) {
        if (!animal.biomas.includes(this.bioma) && !animal.biomas.some(bioma => this.bioma.includes(bioma))) {
            return false;
        }

        let espacoNecessario = animal.tamanho * quantidade;

        if (this.animais.length > 0) {
            const temCarnivoro = this.animais.some(a => a.animal.carnivoro);

            if ((temCarnivoro || animal.carnivoro ) && animal.especie !== this.animais[0].animal.especie) {
                return false
            }

            if (animal.especie !== this.animais[0].animal.especie){
                espacoNecessario += 1;
            }

        }

        if (animal.especie === 'hipopotamo' && this.bioma !== 'savana e rio') {
            return false;
        }

        if (this.animais.length > 0 && this.animais[0].especie !== animal.especie) {
            espacoNecessario += 1;
        }

        if (animal.especie === 'macaco' && this.animais.length === 0 && quantidade === 1) {
            return false;
        }

        return espacoNecessario <= this.espacoDisponivel();
    }
}

export { Recinto };