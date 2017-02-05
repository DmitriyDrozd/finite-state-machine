class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config['initial'] || !config['states']) {
            throw new Error("Config hasn\'t passed");
        }

        this.initialState = config.initial;
        this.state = config.initial;
        this.statesStorage = config.states;
        this.stateTransitions = config.states[config.initial].transitions;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.statesStorage[state]) {
            throw new Error('Such state doesn\'t exist');
        }

        this.state = state;
        this.stateTransitions = this.statesStorage[this.state].transitions;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.stateTransitions[event]) {
            throw new Error('Such state doesn\'t exist');
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initialState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];

        for (let state in this.statesStorage) {
            if (event) {
                for (let transition in this.statesStorage[state].transitions) {
                    if (transition === event) {
                        states.push(state);
                    }
                }
            }
            else {
                states.push(state);
            }
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
