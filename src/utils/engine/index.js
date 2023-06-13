import { Engine } from 'json-rules-engine';
import { arrayOperators } from './operators';

export class RuleEngine extends Engine {
    constructor(...params) {
        super(...params)
        arrayOperators(this)
    }
}

export default RuleEngine;