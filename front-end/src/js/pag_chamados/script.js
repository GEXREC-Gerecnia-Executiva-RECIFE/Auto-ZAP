document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");
    const searchInput = document.getElementById("search");

    const chamados = [
        { numero: 1, 
            solicitante: "João Silva", 
            setor: "APS - Areias", 
            tipo: "Abrir chamado para suporte", 
            categoria: "Erro de sistema", 
            descricao: "Erro ao acessar o portal", 
            data: "04/12/2024", 
            estado: "Encerrado" },

        { numero: 2, 
            solicitante: "Juan José", 
            setor: "APS São Lourenço da Mata", 
            tipo: "Manutenção", 
            categoria: "Hardware", 
            descricao: "Meu computador quebrou", 
            data: "06/12/2024", 
            estado: "Encerrado" },

        { numero: 3, 
            solicitante: "Maria Oliveira", 
            setor: "APS Cabo", 
            tipo: "Troca de Senha", 
            categoria: "GERID", 
            descricao: "preciso acessar o PAT", 
            data: "09/12/2024", 
            estado: "Encerrado" },

        { numero: 4, 
            solicitante: "Fábio Rodrigues", 
            setor: "APS Pina", 
            tipo: "Instalação ou Atualização de Software", 
            categoria: "VPN", 
            descricao: "VPN para acessar o SABI", 
            data: "10/12/2024", 
            estado: "Encerrado" },

        { numero: 5, 
            solicitante: "Samuel Jefferson", 
            setor: "GEXREC 4º andar", 
            tipo: "Manutenção", 
            categoria: "Hardware", 
            descricao: "Meu computador não liga", 
            data: "11/12/2024", 
            estado: "Aberto" }
    ];

    const renderTable = (filtro = "") => {
        tableBody.innerHTML = "";
        chamados
            .filter(chamado => chamado.solicitante.toLowerCase().includes(filtro.toLowerCase()))
            .forEach(chamado => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${chamado.numero}</td>
                    <td>${chamado.solicitante}</td>
                    <td>${chamado.setor}</td>
                    <td>${chamado.tipo}</td>
                    <td>${chamado.categoria}</td>
                    <td>${chamado.descricao}</td>
                    <td>${chamado.data}</td>
                    <td>${chamado.estado}</td>
                `;
                tableBody.appendChild(row);
            });
    };

    searchInput.addEventListener("input", (e) => {
        renderTable(e.target.value);
    });

    renderTable();
});
