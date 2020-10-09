# DAGs

A library that implements a Directed Acyclic Graph (DAG) and some related functionality.

<br>
  <p align="center">
    <a href="https://github.com/AlexanderLapygin/dags/actions?query=workflow%3Aunit-tests"><img alt="Unit Testing status" src="https://github.com/AlexanderLapygin/dags/workflows/unit-tests/badge.svg"></a>
    <a href="https://github.com/AlexanderLapygin/dags/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/AlexanderLapygin/dags"></a>  
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@dags/core.svg?style=flat"/>
    <a href="https://github.com/AlexanderLapygin/dags/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/AlexanderLapygin/dags"></a>  
    <a href="https://github.com/AlexanderLapygin/dags/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/AlexanderLapygin/dags"></a>
    <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@dags/core"/>
    <a href="https://github.com/AlexanderLapygin/dags/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/AlexanderLapygin/dags"></a>
  </p>
<br />

## Installing DAGs

To use DAG modules, all you need to do is install the `@dags/core` package:

```sh
$ yarn add @dags/core

# or

$ npm install @dags/core
```

## Usage

At the moment, the library exposes such modules:

- `dag`
- `uid-counter`
- `uid-uuid`

For example, you can use the `dag` module like this:

```ts
import { Dag, UUID } from '@dags/core'

const dag = new Dag(new UUID());

const parent = dag.newNode();
const child = dag.newNode();
dag.setParenthood(child, parent);
```
## License

MIT © [Alexander Lapygin](https://github.com/AlexanderLapygin)
