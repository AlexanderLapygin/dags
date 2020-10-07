# Welcome to the DAGs

This is the core module of the dags monorepo.


## Installing DAGs

To use DAG modules, all you need to do is install the `@dags/core` package:

```sh
$ yarn add @dags/core

# or

$ npm install @dags/core
```

## Usage

At the moment, the library exposes such modules:

- dag
- uid-counter
- uid-uuid

For example, you can use the `dag` module like this:

```ts
import { Dag } from '@dags/dag'

  const parent = dag.newNode();
  const child = dag.newNode();
  dag.setParenthood(child, parent);
```
