# Typegoose Examples

This Repository contains Example projects with basic showcases and integrations with other packages.

See the [`examples`](./examples/) directory for all examples available.

## Setup

Thanks to yarn and jest, the setup is quite simple:

```sh
git clone https://github.com/typegoose/typegoose-examples.git --depth 10
cd typegoose-examples
yarn install

# Verify that all projects are working
yarn run test
```

## Add a new example

Adding new examples is simple thanks to the boilerplate [`basic`](./examples/basic/) example, just clone it and modify the clone:

```sh
# Starting point is in the root of the project (where the current README exists)
cd examples/
cp -R ./basic ./your-new-example
cd your-new-example

# Apply all modifications you want to the new example

# Verify your example is working
# while being in the example, only that example's tests are run
yarn run test

# No extra addition anywhere else is needed
# And root-level testing also works out-of-the-box
cd ../../
yarn run test
# or while still being in the example
yarn --cwd ../../ test
```
