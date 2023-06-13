import { Engine } from 'json-rules-engine';

export class RuleEngine extends Engine {
    constructor(...params) {
        super(...params)
        this.addOperator('sizeEquals', (factValue, jsonValue) => {
            if (!factValue?.length) return false
            return factValue?.length === jsonValue
        })
    }
}

export default RuleEngine;