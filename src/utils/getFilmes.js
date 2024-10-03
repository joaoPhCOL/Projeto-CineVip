

export async function buscarFilmeOMDb(titulo) {
    const apiKey = '12e2eda2';
    const response = await fetch(`http://www.omdbapi.com/?t=${titulo}&apikey=${apiKey}`)

    const dados = await response.json();
    console.log(dados);

    return dados;
}
