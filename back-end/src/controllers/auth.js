const jwt = require('jsonwebtoken');

// Função para gerar um token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '1h', // O token expira em 1 hora
    });
};

// Middleware para verificar o token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        req.user = decoded; // Salva os dados do usuário decodificado na requisição
        next();
    });
};

module.exports = {
    generateToken,
    verifyToken,
};