import { Dag, UUID } from '@dags/core'

const dag = new Dag(new UUID())

const parent = dag.newNode()
const child = dag.newNode()
console.log(dag.getNodes().size)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.setParenthood(child, parent)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.removeParenthood(child, parent)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)
