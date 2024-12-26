const { saveMessage } = require('../models/message');
const userSessions = {};
var optionRegister = 0


async function sendWelcomeMessage(client, from) {
    const welcomeQuestion = "Bem-vindo ao Suporte de TI!\n\n";
    return await client.sendMessage(from, welcomeQuestion)
        .then(() => {
        })
        .catch((error) => {
            console.error("Erro ao enviar mensagem de boas-vindas:", error);
        });
}

async function askForName(client, from) {
    const nameQuestion = "Para começar, qual o seu nome?";
    return await client.sendMessage(from, nameQuestion)
        .then(() => {
        })
        .catch((error) => {
            console.error("Erro ao enviar pergunta sobre nome:", error);
        });
}

async function askForAgency(client, from) {
    const unitMessage = "Por favor, informe a unidade/setor à qual você pertence.";
    return await client.sendMessage(from, unitMessage)
        .then(() => {
        })
        .catch((error) => {
            console.error("Erro ao enviar pergunta sobre unidade/setor:", error);
        });
}

async function sendWelcomeMenu(client, from) {
    const welcomeMenu =
        "Como podemos ajudá-lo hoje?\n\n" +
        "1️⃣ Abrir chamado para Suporte\n" +
        "2️⃣ Troca de senha\n" +
        "3️⃣ Manutenção\n" +
        "4️⃣ Instalação ou Atualização de Software\n\n" +
        "Por favor, responda com o número da opção desejada.";
    return await client.sendMessage(from, welcomeMenu)
        .then(() => {
            
        })
        .catch((error) => {
            console.error("Erro ao enviar menu de boas-vindas:", error);
        });
}

function formatNumber(number) {
    return number.replace(/@[a-z]\.us/, ""); 
}

async function handleOptionSelection(client, from, option, session) {
    let responseMessage;

    switch (option) {
        case '1':
            responseMessage = "Você escolheu: Suporte. Por favor, descreva em detalhes o problema que você está enfrentando.";
            session.step = 'awaiting_type';
            optionRegister = "Suporte"
            break;
        case '2':
            responseMessage = "Você escolheu: Troca de senha. Qual serviço necessita da troca de senha (ex: e-mail, sistema interno, etc)?";
            session.step = 'awaiting_type';
            optionRegister = "Troca de senha"
            break;
        case '3':
            responseMessage = "Você escolheu: Manutenção. Que tipo de manutenção é necessária (ex: hardware, software)?";
            session.step = 'awaiting_type';
            optionRegister = "Manutenção"
            break;
        case '4':
            responseMessage = "Você escolheu: Instalação ou Atualização de Software. Por favor, informe o software a ser instalado ou atualizado.";
            session.step = 'awaiting_type';
            optionRegister = "Instalação ou Atualização de Software"
            break;
        default:
            responseMessage = "Opção inválida. Por favor, responda com o número correspondente.";
            await sendWelcomeMenu(client, from);
            break;
    }

    if (responseMessage) {
        await client.sendMessage(from, responseMessage);
    }
}

async function handleUserMessage(client, message) {
    const from = message.from;
    const userMessage = message.body.trim();
    const number = formatNumber(from);
    
    const called = userSessions[from]?.called || { number };
    
    if (!userSessions[from]) {
        userSessions[from] = { step: 'awaiting_name', called };
        called.first = userMessage;

        await sendWelcomeMessage(client, from);
        await askForName(client, from);
    } else {
        const session = userSessions[from];
        switch (session.step) {
            case 'awaiting_name':
                session.called.name = userMessage;
                session.step = 'awaiting_agency';
                await client.sendMessage(from, `Prazer em conhecê-lo, ${userMessage}!`);
                await askForAgency(client, from);
                break;

            case 'awaiting_agency':
                session.called.unit = userMessage;
                session.step = 'awaiting_selection';
                await client.sendMessage(from, `Unidade registrada: ${userMessage}.`);
                await sendWelcomeMenu(client, from);
                break;

            case 'awaiting_selection':
                await handleOptionSelection(client, from, userMessage, session);
                break;

            case 'awaiting_type':
                session.called.type = optionRegister;
                session.called.option = userMessage;
                session.step = 'awaiting_detailed_description';
                await client.sendMessage(from, "Obrigado. Por favor, descreva o problema detalhadamente.");
                break;

            case 'awaiting_detailed_description':
                session.called.detail = userMessage;
                session.called.situation = 'open';
                await saveMessage(session.called); 
                await client.sendMessage(from, `Chamado registrado: "${optionRegister}". Nossa equipe entrará em contato em breve.`);
                delete userSessions[from]; 
                break;

            default:
                break;
        }
    }
}

module.exports = {
    handleUserMessage
};

