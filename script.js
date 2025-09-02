document.querySelector('#botao-processar').addEventListener('click', () => {
    const texto = document.querySelector('#entrada-de-texto').value;
    const palavras = extrairPalavras(texto);
    const baseUnificada = unificarPalavras(palavras);
    const frequencias = contarFrequencias(baseUnificada);
    const ordenadas = Object.entries(frequencias).sort((a, b) => b[1] - a[1]);

    const metade = Math.ceil(ordenadas.length / 2);
    const maisFreq = ordenadas.slice(0, metade);
    const menosFreq = ordenadas.slice(metade);

    mostrarResultados('#mais-frequentes', maisFreq);
    mostrarResultados('#menos-frequentes', menosFreq);
});

function extrairPalavras(texto) {
    return (texto.match(/[\p{L}\p{N}]+/gu) || []).map(p => p.toLowerCase());
}

function unificarPalavras(palavras) {
    return palavras.map(p => {
        // Remove plurais e femininos simples (ex: alunos → aluno, alunas → aluno)
        return p.replace(/(as|os|a|o|es|s)$/i, '');
    });
}

function contarFrequencias(palavras) {
    const freq = {};
    for (let palavra of palavras) {
        if (palavra.length < 3) continue; // Ignora palavras muito curtas
        freq[palavra] = (freq[palavra] || 0) + 1;
    }
    return freq;
}

function mostrarResultados(seletor, lista) {
    const container = document.querySelector(seletor);
    container.innerHTML = '';
    lista.forEach(([palavra, freq]) => {
        const div = document.createElement('div');
        div.className = 'palavra-item';
        div.textContent = `${palavra} (${freq})`;
        container.appendChild(div);
    });
}