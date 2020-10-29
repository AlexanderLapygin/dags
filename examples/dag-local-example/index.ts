import { DagLocal } from '@dags/core'

const dag = new DagLocal()

console.log('DagLocal example:')

const parent = dag.newNode()
const child = dag.newNode()
console.log(dag.getNodes().size)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.setParenthood(parent, child)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.removeParenthood(parent, child)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)
