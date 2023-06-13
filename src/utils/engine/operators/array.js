export default (engine) => {
    engine.addOperator('isEmpty', (factValue) => factValue?.length === 0)
    engine.addOperator('sizeEqual', (factValue, jsonValue) => factValue?.length === jsonValue)
    engine.addOperator('sizeNotEqual', (factValue, jsonValue) => factValue?.length !== jsonValue)
    engine.addOperator('sizeGreaterThan', (factValue, jsonValue) => factValue?.length > jsonValue)
    engine.addOperator('sizeLessThan', (factValue, jsonValue) => factValue?.length < jsonValue)
}