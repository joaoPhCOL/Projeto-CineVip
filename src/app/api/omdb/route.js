import { PrismaClient } from '@prisma/client';
import { buscarFilmeOMDb } from '../../../utils/getFilmes';

const prisma = new PrismaClient();

export async function GET() {
    /*
    const titulos = [
        'Inception',
        'Interstellar',
        'The Matrix',
        'The Shawshank Redemption',
        'Pulp Fiction',
        'Fight Club',
        'Forrest Gump',
        'The Dark Knight',
        'The Godfather',
        'The Lord of the Rings: The Return of the King',
        'The Empire Strikes Back',
        'Schindler\'s List',
        'The Silence of the Lambs',
        'Saving Private Ryan',
        'The Green Mile',
        'Gladiator',
        'Jurassic Park',
        'Titanic',
        'Avatar',
        'The Avengers',
        'The Departed',
        'The Social Network',
        'Black Swan',
        'Gone Girl',
        '12 Years a Slave',
        'La La Land',
        'Mad Max: Fury Road',
        'The Revenant',
        'Inside Out',
        'Coco',
        'The Lion King',
        'Finding Nemo',
        'Zootopia',
        'Toy Story',
        'WALL-E',
        'The Incredibles',
        'Up',
        'A Beautiful Mind',
        'The Prestige',
        'Se7en',
        'The Usual Suspects',
        'Memento',
        'American Beauty',
        'The Sixth Sense',
        'Her',
        'Moonlight',
        'The Shape of Water',
        'Parasite'
    ];
    */
    const titulos = ['Her'];

    const filmesCadastrados = [];

    for (const titulo of titulos) {
        try {
            const dadosFilmeOMDb = await buscarFilmeOMDb(titulo);

            if (dadosFilmeOMDb && dadosFilmeOMDb.Response !== 'False') {
                
                const filme = {
                    titulo: dadosFilmeOMDb.Title,
                    ano: parseInt(dadosFilmeOMDb.Year),
                    lancamento: new Date(dadosFilmeOMDb.Released),
                    genero: dadosFilmeOMDb.Genre.split(",")[0], // Pega o primeiro gênero
                    diretor: dadosFilmeOMDb.Director,
                };

                const novoFilme = await prisma.filmes.create({
                    data: filme,
                });

                filmesCadastrados.push(novoFilme);
            } else {
                console.log(`Filme não encontrado: ${titulo}`);
            }
        } catch (error) {
            console.error(`Erro ao buscar o filme ${titulo}:`, error);
        }
    }


    return new Response(JSON.stringify(filmesCadastrados), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
