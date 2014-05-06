# Here should be a project name.

And some brief project description

---



## Prerequisites


1. nodejs, npm and grunt

   The only necessary thing as prerequisite is to have installed at least the
   version 0.9.0 of nodejs.
   ```
   $:> sudo apt-get install node npm
   ```
   When nodejs is installed, it’s possible to install the grunt command line interface via npm:
   ```
   $:> npm install -g grunt
   $:> npm install -g grunt-cli
   ```

2. Install project dependencies:
   corresponding to package.json npm will install all dependencies locally to ./node_modules dir
   ```
   $:> npm install
   ```

3. Minify/uglify/etc
   run default grunt task which actually do the tricks
   ```
   $:> grunt
   ```
