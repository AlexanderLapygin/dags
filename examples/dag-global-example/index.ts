import { DagLocal } from '@dags/core'
import { DagGlobal } from '@dags/dag-global'

const dag = new DagGlobal()

console.log('DagGlobal example:')

const parent = dag.newNode()
const child = dag.newNode()

console.log(parent.equals(parent))
console.log(parent.equals(child))

console.log(dag.getNodes().size)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.setParenthood(parent, child)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)

dag.removeParenthood(parent, child)

console.log(dag.getChildren(parent).size)
console.log(dag.getParents(child).size)
