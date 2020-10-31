# Directed Acyclic Graph with global node identification

This is the core module of the dags monorepo.

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

## Install

```sh
$ yarn add @dags/core

# or

$ npm install @dags/core
```

## Usage

```ts
import { DagGlobal } from '@dags/core'

const dag = new DagGlobal()

const parent = dag.newNode()
const child = dag.newNode()

console.log(parent.equals(parent))
console.log(parent.equals(child))

dag.setParenthood(parent, child)
```
