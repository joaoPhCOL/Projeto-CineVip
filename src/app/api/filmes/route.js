import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar um novo filme
export async function POST(request) {
  const body = await request.json();
  
  console.log('Método: POST');
  console.log('Corpo da requisição:', body);

  const { titulo, ano, lancamento, genero, diretor } = body;

  try {
    const filme = await prisma.filmes.create({
      data: {
        titulo,
        ano: parseInt(ano),
        lancamento: new Date(lancamento),
        genero,
        diretor,
      },
    });
    return new Response(JSON.stringify(filme), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao salvar filme:', error);
    return new Response(JSON.stringify({ error: 'Erro ao salvar filme: ' + error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Ler todos os filmes
export async function GET(request) {
  try {
    const filmes = await prisma.filmes.findMany();
    return new Response(JSON.stringify(filmes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar filmes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Atualizar um filme
export async function PUT(request) {
  const body = await request.json();
  const { id, titulo, ano, lancamento, genero, diretor } = body;

  try {
    const filme = await prisma.filmes.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        ano: parseInt(ano),
        lancamento: new Date(lancamento),
        genero,
        diretor,
      },
    });
    return new Response(JSON.stringify(filme), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar filme' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Excluir um filme
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    await prisma.filmes.delete({
      where: { id: parseInt(id) },
    });
    return new Response(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Erro ao excluir filme:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir filme' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
