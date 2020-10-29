# DAGs

A library that implements a **Directed Acyclic Graph** and some related functionality.

<br>
  <p align="center">
    <a href="https://www.npmjs.com/package/@dags/core"><img alt="NPM module version" src="https://img.shields.io/npm/v/@dags/core"></a>  
    <a href="https://github.com/AlexanderLapygin/dags/actions?query=workflow%3Aci"><img alt="CI status" src="https://github.com/alexanderlapygin/dags/workflows/CI/badge.svg"></a>
    <a href="https://github.com/AlexanderLapygin/dags/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/AlexanderLapygin/dags"></a>  
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@dags/core.svg?style=flat"/>
    <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@dags/core"/>
    <a href="https://github.com/AlexanderLapygin/dags/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/AlexanderLapygin/dags"></a>
  </p>
<br />

## Installing

To use DAG modules, all you need to do is install the `@dags/core` package:

```sh
$ yarn add @dags/core

# or

$ npm install @dags/core
```

## Usage

At the moment, the library provides the following modules:

- `dag`
- `uid-counter`
- `uid-uuid`

For example, you can use the `dag` module in semi-procedural style like this:

```ts
import { Dag, UUID } from '@dags/core'

const dag = new Dag(UUID)

const parent = dag.newNode()
const child = dag.newNode()
dag.setParenthood(parent, child)
```

## License

MIT © [Alexander Lapygin](https://github.com/AlexanderLapygin)
