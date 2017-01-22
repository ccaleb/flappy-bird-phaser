# Flappy Bird Phaser

A Flappy Bird clone written with the Phaser.io HTML game engine and JavaScript ES6. Babel is used to transpile the ES6 code to JavaScript ES5 for full browser compatability.

## Workspace Setup
Setup the project's workspace by walking through the following steps.
#### 1. Install Node.js.
If you already have Node.js installed then ensure it has been updated to the latest version:
```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```
If you don't have Node.js installed then download the installer from the [official NodeJS site](http://nodejs.org/).

#### 2. Install the following packages globally:
```
sudo npm install -g bower
sudo npm install -g browserify
sudo npm install -g babel
sudo npm install -g babelify
sudo npm install -g grunt-cli
```
#### 3. Move to the project folder:
```
cd flappy-bird-phaser/
```
#### 4. Locally install all the node packages required by the project:
```
sudo npm install
```
#### 5. Locally install the Bower packages that are required:
```
sudo bower install --allow-root
```
## Develop, Build and Continuously Test on a Local Web Server
To run a local web server and have Grunt watch your files for changes, enter the following into the Terminal window:
```
cd flappy-bird-phaser/
grunt
```
Any changes to your .js files will force the project to be re-built in the background allowing you to easily see your changes within the web browser as you develop.
## Build for Upload to Web Server
Use the Grunt task runner to build a minified version of the project. Enter the following into the Terminal window:
```
cd flappy-bird-phaser/
grunt build
```
Then copy the contents of the `build` folder to your remote web server.


