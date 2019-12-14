# PlanNGo

This is an [Ionic 4](https://ionicframework.com/) [Angular](https://angular.io/) project.

## Installation

1. [Git](https://git-scm.com/)
2. [NodeJS](https://nodejs.org/en/)
3. [Github desktop](https://desktop.github.com/) (optional)
4. Any code editor that you are comfortable with

## Set up

After installing the necessary software, you will need to execute this command on the CLI

> Install Ionic globally

```bash
npm install -g ionic cordova
```

Once done, you will need to clone the project at Github. If you are not using Github desktop, you will need to execute this command on the CLI to clone it.

> Git clone

```bash
git clone https://github.com/luazhizhan/PlanNGo.git
```

Next, go into the project directory and execute this command on the CLI to install all the node modules needed to start this application

> Install node modules

```bash
npm install
```

Execute this command on the CLI to start this project on the browser.

> Start the project on the browser

```bash
npm start
```

## Heroku server Node.JS application

- The heroku server Node.JS application is location at `server/elp-planngo` folder. This folder is a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). A submodule is a git repository in another git repository. This folder will be empty after you clone this repo.

- You will need to go to the heroku server folder to get all the files. This can be done using the command below.

```bash
git submodule update --init
```

- You can use the same commands to commit and push changes you have made in this folder just like any git repository. The githhub repository (root folder) will track the changes that were made in the heroku git repository.

## Workflow

The main branch for this project will be master branch. Please create new branch for your own development.

## Useful references

### Git

- [Learn git](https://guides.github.com/introduction/git-handbook/)
- [Github desktop](https://help.github.com/en/desktop/getting-started-with-github-desktop/setting-up-github-desktop)

### Ionic

- [What is Ionic](https://ionicframework.com/docs/intro)
- [Ionic UI Components](https://ionicframework.com/docs/components)
- [Capacitor](https://capacitor.ionicframework.com/docs/)
- [Capacitor and Codova](https://ionicframework.com/blog/announcing-capacitor-1-0/)

### Angular

- [Learn Angular](https://angular.io/start)
