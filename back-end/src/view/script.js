// Função para buscar todas as mensagens
async function fetchAllMessages() {
    try {
        const response = await fetch('http://localhost:3000/messages'); // Fazendo a requisição para obter todas as mensagens
        if (!response.ok) {
            throw new Error('Erro ao buscar mensagens');
        }
        const messages = await response.json();
        displayMessages(messages); // Chama a função para exibir as mensagens
    } catch (error) {
        console.error(error);
    }
}

// Função para exibir as mensagens em uma tabela
function displayMessages(messages) {
    const tableBody = document.getElementById('messagesTableBody'); // Obtém o corpo da tabela

    // Limpa o conteúdo anterior
    tableBody.innerHTML = '';

    // Adiciona cada mensagem como uma nova linha na tabela
    messages.forEach(message => {
        const row = document.createElement('tr');
        
        // Cria células para cada atributo da mensagem
        row.innerHTML = `
            <td>${message.number}</td>
            <td>${message.firstMessage}</td>
            <td>${message.nameMessage}</td>
            <td>${message.unitMessage}</td>
            <td>${message.typeMessage}</td>
            <td>${message.optionMessage}</td>
            <td>${message.detailMessage}</td>
            <th>
            <button>Finalizar</button>
            <button>Remover</button>
            </th>
        `;
        
        tableBody.appendChild(row); // Adiciona a linha ao corpo da tabela
    });
}

// Adiciona um evento ao botão de filtro
// Adiciona um evento ao botão de filtro
document.getElementById('applyFilter').addEventListener('click', async () => {
    const filterType = document.getElementById('filterType').value;
    console.log(filterType)
    // Envia a requisição para o backend com o filtro
    const response = await fetch(`http://localhost:3000/messages/tipo/${filterType}`, {
        method: 'GET', // O método deve ser GET
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        console.error('Erro ao buscar mensagens filtradas');
        return;
    }
    const messages = await response.json();
    // Exibe as mensagens filtradas na tabela
    displayMessages(messages);
});

document.getElementById('reloadMessagesButton').addEventListener('click', async () => {
    await fetchAllMessages(); // Chama a função para buscar e exibir as mensagens novamente
});

// Chame a função para buscar e exibir as mensagens ao carregar a página
window.onload = fetchAllMessages;