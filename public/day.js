// Evento de clique no botão para carregar as matérias
document.getElementById('loadMateriasBtn').addEventListener('click', function() {
    // Pega o valor selecionado no dropdown
    const dia = document.getElementById('diaSelect').value;

    // Log para verificar o valor de 'dia'
    console.log("Dia selecionado para enviar:", dia); 

    // Faz a requisição POST ao servidor para buscar as matérias
    fetch('/Day', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dia })  // Envia o valor de 'dia' no corpo da requisição
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('container');
        container.innerHTML = '';  // Limpa o conteúdo anterior

        if (data.materia) {
            // Exibe as matérias
            data.materia.forEach(subject => {
                const content = document.createElement('div');
                content.classList.add("materia");
                content.innerHTML = `<strong>${subject.nome}</strong> - ${subject.state}`;
                container.appendChild(content);
            });
        } else {
            container.innerHTML = 'Nenhuma matéria encontrada para este dia.';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
