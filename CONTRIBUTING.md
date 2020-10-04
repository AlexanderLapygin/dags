Thank you for considering contributing to our project. Your help is very welcome!

There're many ways to contribute, help to improve these projects and spread the word. This doc describes some general
guidelines for some of them.

When contributing, it's better to first discuss a change you wish to make via issue, email, or any other method with the
owners of this repository before making one.

All members of our community are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

When it comes to open source, there are different ways you can contribute, all of which are valuable. Here are few
guidelines that should help you as you prepare your contribution.

- [Setup](#setup)
- [Development](#development)
  - [Tooling](#tooling)
  - [Commands](#commands)
    - [Package Aliasing and Yarn Workspace](#package-aliasing-and-yarn-workspace)
- [Think you found a bug?](#think-you-found-a-bug)
- [Proposing something new?](#proposing-something-new)
- [Making a Pull Request?](#making-a-pull-request)
  - [Commit Convention](#commit-convention)
  - [Testing](#testing)
  - [Steps to Pull Request](#steps-to-pull-request)
  - [Continuous integration](#continuous-integration)
    - [Publication details](#publication-details)
- [License](#license)

## Setup

The following steps will get you setup to contribute changes to this repo:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://https://github.com/AlexanderLapygin/dags))

2. Clone your fork locally

```sh
# in a terminal, cd to parent directory where you want your clone to be, then
git clone https://github.com/<your_github_username>/dags.git

cd dags
```

3. Setup all dependencies and build. DAGs uses `yarn` and `lerna`, so run `yarn prestart`.
This command will install dependencies and bootstrap the repo using `lerna`. Then the command `yarn build` will build
all packages.


## Development

To improve our development process, we've setup a couple of systems.
DAGs uses a monorepo structure, this means each module has its own package and can be used independently.

### Tooling

- [Lerna](https://lerna.js.org/) to manage installation of dependencies and running various scripts. We also have Yarn
Workspaces enabled by default.

### Commands

**`yarn boot`**: bootstraps the entire project, symlinks all dependencies for cross-component development and builds all
components.

**`yarn bootstrap`**: bootstraps the entire project and symlinks all dependencies for cross-component development

**`yarn build`**: run build for all component packages

**`yarn test`**: run test for all component packages

**`yarn versionup-then-release-in-ci`**: bump the version of the changed packages and then publish them 

**`yarn [package] <cmd>`**: Run a command on the specific package you're working on. You can run `build`, `test`,
`lint` commands

#### Package Aliasing and Yarn Workspace

Since we're using lerna monorepo + yarn workspaces by default, this enables us
to run commands within component packages directly from the root.

Each component is named this way: `@dags/[module]`. Let's say we want to build the `dag` component. Here's how to do it:

```bash
yarn workspace @dags/dag build

# or

lerna run build --scope @dags/dag
```

**Shortcut:** To make this shorter and more convenient, we've added an alias for each component in the root
`package.json`. Now you can simply do:

```bash
# to build
yarn dag build

# to test
yarn dag test
yarn dag test --watch

# to lint
yarn dag lint
```

This alias is particularly useful when you're working on a specific component and want to avoid running the command for
all components.

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction with a code example.
The best way to show the bug is to add a failing unit test to your fork and pass it to us by the pull request.

## Proposing something new?

Please provide thoughtful comments and some sample code. Proposals that doesn't line up with our roadmap or doesn't have
a thoughtful explanation will be closed.

## Making a Pull Request?

Follow the pulling requests rules below, please!

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this
repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit
message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

We also follow the convention `[type/scope]`, where:
  - `type` can be either `docs`, `fix`, `feat`, `build`, or any other conventional commit type
  - `scope` is just a short id that describes the scope of work.

For example, `fix/dag`, `docs/core`. 
 
If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Testing

All commits that fix bugs or add features need a test.

### Steps to Pull Request

1. Fork of the `dags` repository and clone your fork.
2. Make the changes needed for your PR in the `master` branch.
3. Make sure you cover all code changes with unit tests.
4. Update [README.md](README.md) to reflect every relevant change.
5. When you are ready, create a PR of your fork into the original repository.

## Continuous integration

Now, in the early stages of development, we use the
[Continuous integration](https://martinfowler.com/articles/branching-patterns.html#continuous-integration) pattern as
our branching policy. In fact, everything is done in the `master` branch.

CI is based on the functionality of [GitHub Actions](https://github.com/features/actions).

On each push in `master` branch CI creates the releases of the changed public modules and publish them to NPM.

### Publication details

The versions of the changed public modules are published by the `versionup-then-release-in-ci` command. When it is
executed, Lerna bumps the versions of the changed packages, push them to github, after which CI in its turn creates the
releases and publishes them to NPM.

## License

By contributing your code to this repository, you agree to license your contribution under the [MIT license](LICENSE).
