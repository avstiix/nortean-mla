class DocumentStateManager {
    #documentState = new Map();
    #stateHistory = [];

    saveState(documentId, state) {
        this.#stateHistory.push({
            id: documentId,
            state: structuredClone(state),
            timestamp: Date.now()
        });
        this.#documentState.set(documentId, state);
    }

    getState(documentId) {
        return this.#documentState.get(documentId);
    }

    getHistory(documentId) {
        return this.#stateHistory.filter(item => item.id === documentId);
    }
} 