# Directed Acyclic Graph with local identification

## Install

```sh
$ yarn add @dags/core

# or

$ npm install @dags/core
```

## Usage

```ts
import { DagLocal } from '@dags/core'

const dag = new DagLocal()

const parent = dag.newNode()
const child = dag.newNode()

console.log(parent.equals(parent))
console.log(parent.equals(child))

dag.setParenthood(parent, child)
```
