# Contributing to After.js

Hi there! Thanks for your interest in After.js. This guide will help you get started contributing.

<!-- prettier-ignore-start -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [Contributing to After.js](#contributing-to-afterjs)
	- [Project Structure](#project-structure)
	- [Developing locally](#developing-locally)
		- [Commands](#commands)
		- [Updating your fork](#updating-your-fork)
	- [Adding examples](#adding-examples)
		- [Use `examples/basic` as template](#use-examplesbasic-as-template)
		- [Naming examples](#naming-examples)
		- [How to get your example merged](#how-to-get-your-example-merged)
	- [Why wasn't my PR merged?](#why-wasnt-my-pr-merged)
	- [Getting help](#getting-help)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- prettier-ignore-end -->

## Project Structure

After.js is monorepo made up of a several npm packages powered by Lerna.

- `examples`: All examples go in here.
- `packages`: This is where the magic happens
  - `after`: The core library
- `scripts`: Utility scripts related to cleaning and bootstrapping the repo
- `test`: End-to-end tests

## Developing locally

First, fork the repo to your GitHub account. Then clone your fork to your local
machine and make a new branch for your feature/bug/patch etc. It's a good idea to not develop directly on master so you can get updates.

```
git clone https://github.com/<YOUR_GITHUB_USERNAME>/after.js.git
cd After.js
git checkout -B <my-branch>
yarn
```

This will install all `node_modules` in all the packages and all the examples and symlink
inter-dependencies. Thus when you make local changes in any of the packages you can try them
immediately in all the examples.

### Commands

- `yarn run clean`: Clean up all `node_modules` and remove all symlinks from packages and examples.
- `yarn run bootstrap`: Run `yarn` on all examples and packages. Automatically symlinks inter-dependent modules.
- `yarn run e2e`: Runs end-to-end tests
- `yarn test`: Run the jest tests in watch mode
- `yarn test:ci`: Run the tests without watch and probably in a CI environment

### Updating your fork

Only first time add a upstream remote to your fork:

```bash
git remote add upstream https://github.com/jaredpalmer/after.js.git
```

When you want to pull down changes to your fork enter the following into your terminal:

```bash
git fetch upstream
git checkout master
git merge upstream/master
```

References: [Configure a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/), [sync a fork](https://help.github.com/articles/syncing-a-fork/)

## Adding examples

### Use `examples/basic` as template

If you'd like to add an example, I suggest you duplicate the `examples/basic` folder and use that as kind of base template. Before you start adding stuff, go ahead and change the name of the package in the your new example's `package.json`. Then go back to the project root and run `yarn bootstrap`. This will make sure that your new example is using your local version of all the `packages`.

### Naming examples

All example folders should be named `with-<thing-you-are-demonstrating>`. Each example's npm package name (found in it's `package.json`) should look like `after-examples-with-<thing-you-are-demonstrating>`.

### How to get your example merged

- Make sure to comment the important parts of your code and include a **well-written**
  "Idea behind the example" section. This is more important to me than your actual code.
- Keep your example limited to one idea / library / feature (e.g. don't submit `with-styled-components-and-material-ui`). That being said, there are times when this rule will be relaxed such as if you are showing how to use Apollo and Redux or \<Flux Library\> + React Router.
- Your example **MUST** implement Hot Module Replacement. If it does not update when you make edits, you have broken something.
- Your example should be minimalistic and concise, or a direct copy of another prominent example from the original library (like copying an example directly from react-redux).

## Why wasn't my PR merged?

I will do my best to write out my reasoning before closing a PR, but 80% of the time it falls under one of these...

- You did not read this document
- Your code breaks an internal application (I will be transparent about this)
- Your code conflicts with some future plans (I will be transparent about this too)
- You've said something inappropriate or have broken the Code of Conduct

## Getting help

Tweet / DM [@jaredpalmer](https://twitter.com/jaredpalmer)
