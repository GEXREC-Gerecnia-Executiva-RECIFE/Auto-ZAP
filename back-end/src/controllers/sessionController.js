
const { saveSession, loadSession, deleteSession } = require('../models/sessions');


const handleSaveSession = (id, session) => {
    saveSession(id, session);
};


const handleLoadSession = (id, callback) => {
    loadSession(id, callback);
};


const handleDeleteSession = (id) => {
    deleteSession(id);
};

module.exports = {
    handleSaveSession,
    handleLoadSession,
    handleDeleteSession
};
