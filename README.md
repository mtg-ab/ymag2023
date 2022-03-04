# About

This is a starter pack for developing Hubspot projects. The project structure is:

- /src folder for all your source files
- /dist folder that is synced with Hubspot.

## Features

- Gulp
- SCSS
- Macro utils already integrated
- Prettier & ESLint
- Webpack (ES6)
- Package Manager (Yarn & Npm)
- Generate Module & Template with CLI
- Icon SVG Module

## Enhancement

- SASS for Theme CSS : https://gist.github.com/levinkeo/e233963bdfc0933a4f75b9fdcb591410
- Prettier for Hubl & Html

## Plugin Installed

- jQuery : https://jquery.com/
- Boostrap : https://getbootstrap.com/
- Flickify : https://github.com/metafizzy/flickity
- Lazy Load : https://github.com/verlok/lazyload
- Sticky : https://github.com/rgalus/sticky-js
- Isotope : https://github.com/metafizzy/isotope
- Infinite Scroll : https://github.com/metafizzy/infinite-scroll

Thoses plugins can be updated realy easilly by using packages manager.
Just remove them in the package.json and run `yarn`.
To install them, just run `yarn add + plugin-name`
Comment or uncomment them in main.js :)

# Getting Started

# Important 

## Install Dependencies

- Installer Homebrew : https://brew.sh/index_fr
- Installer Git : brew install git
- Install Java.
- Install Yarn : brew install yarn
- Install Node.js, a Javascript runtime environment that enables the local tools : brew install node
- Install the gulp-cli globally: yarn global add grunt-cli
- Install Visual Studio Code: https://code.visualstudio.com/
- Install Hubl Extension: https://marketplace.visualstudio.com/items?itemName=WilliamSpiro.hubl

## Install all project dependencies

Run in the project root:

```bash
yarn install
```

# Working

## About

This boilerplate handles the building and deploying of JavaScript, CSS and Hubspot modules. It uses Gulp and Webpack to create minified main.js and main.css files and 'builds' all files in the /dist folder. The dist folder is the only folder that is synced with Hubspot, so all files in the project root and in /src are for local development. There are a few default commands that can be used in the package.json. The main command you need to build and sync files with Hubspot is `yarn deploy`.

## The MakeTheGrade Workflow

### Setup Hubspot Configuration

The CMS CLI makes it easy to interact with multiple HubSpot CMS accounts.
Set the name of the entry for your sandbox to be along the lines of “DEV” or “SANDBOX” so it is clear this account is a development environment. Additionally, set the defaultPortal to be your sandbox account, so when you run commands using the CMS CLI, it will automatically interact with your sandbox, and reduce accidental production deploys.

An example for a project called Make The Grade:

````bash
defaultPortal: mtg-lab-1
portals:
  - name: MAKETHEGRADE
    portalId: 123
    authType: personalaccesskey
    personalAccessKey: >-
      xxxxx-xxxxxx-xxxxxxx-xxxxxx-xxxxx-xxxxxxx-xxxxxxxx
    auth:
      tokenInfo:
        accessToken: >-
          xxxxx-xxxxxx-xxxxxxx-xxxxxx-xxxxx-xxxxxxx-xxxxxxxx
        expiresAt: '2020-01-01T00:00:00.000Z'
  - name: mtg-lab-1
    portalId: ***
    authType: personalaccesskey
    personalAccessKey: >-
      xxxxx-xxxxxx-xxxxxxx-xxxxxx-xxxxx-xxxxxxx-xxxxxxxx
    auth:
      tokenInfo:
        accessToken: >-
          xxxxx-xxxxxx-xxxxxxx-xxxxxx-xxxxx-xxxxxxx-xxxxxxxx
        expiresAt: '2020-01-01T00:00:00.000Z'```
````

Now, when running commands in the CMS CLI, like hs upload, if you do not specify a portal, the files will be uploaded to your mtg-lab-1 account.

If you already have a hubspot.config.yml ( meaning you already have used hubspot cli) you can just use this command to add a new portal : 

```hs auth personnalaccesskey```

Then, you must set a name of your portal and the cms api key ( to get it : https://app.hubspot.com/login/two-factor?loginRedirectUrl=https%3A%2F%2Fapp.hubspot.com%2Fshortlink%2Fpersonal-access-key)

## Get Started for your new project

#### Create the repository based on this boilerplate

Then create a new empty directory for your project
`mkdir projectname`

Then copy the entire repository
`git clone --mirror https://github.com/UnityDev/BoilerplateMTG.git projectname`

Change the project name inside the gulpconfig.js. Install all dependencies in the project like so:
`yarn`

Adapt your command on your package.json related to your project :

```
  "scripts": {
    "clean:dist": "rm -rf dist && mkdir dist ",
    "build": "yarn clean:dist && yarn build:gulp && yarn build:webpack",
    "build:webpack": "webpack",
    "build:gulp": "gulp build",
    "build:icons": "gulp build-icons",
    "lint": "eslint \"**/*.{js,jsx}\"",
    "watch": "gulp watch",
    "watch:webpack": "webpack --watch --progress",
    "gen:fields": "gulp generate-fields",
    "gen:module": "yarn plop; yarn gen:fields",
    "hs:auth": "hs auth personalaccesskey",
    "hs:sync-prod": "yarn gen:fields; yarn build:icons; hs upload --overwrite --portal=prod  dist MTG-Boilerplate",
    "hs:sync-dev": "yarn gen:fields; yarn build:icons; hs upload --overwrite --portal=mtg-lab-1  dist MTG-Boilerplate",
    "hs:module": "hs create module",
    "hs:watch": "hs watch --portal=mtg-lab-1 dist MTG-Boilerplate",
    "deploy:prod": "yarn build && yarn hs:sync-prod",
    "deploy:dev": "yarn build && yarn hs:sync-dev"
  },
```

For example you have to change your ```--portal=prod``` to your new project portal name. Globally, you will have to change ```hs:sync-prod```&& ```hs:sync-dev````


Now, you can use the following commands to kick start you development:

- `yarn gen:module <name> src/modules` This command will generate a module.

- `yarn watch` This command will watch for changes regarding to SCSS, macro's and modules. Each module and macro will be copied over to the dist folder; The dist folder is used to publish to HubSpot.

- `yarn watch:webpack` This command will watch for changes regarding to JavaScript. The JavaScript will be transpiled and placed inside the dist folder;

- `yarn hs:watch` This command will watch for file changes inside the dist folder. When triggered these files will be uploaded to the HubSpot portal.

- `yarn deploy:dev` This command will deploy to your hubspot portal related to your dev environment all your files. (compilating before)

- `yarn deploy:prod` This command will deploy to your hubspot portal related to your prod environment all your files. (compilating before)


#### Check Gitbub Actions

##### Deploy Action

GitHub Actions allows you to run a workflow on any GitHub event. In your project root, you should have a file at .github/workflows/deploy.yml

Our deploy workflow is going to occur on pushes to the master branch. Paste the following in your deploy.yml file:

```
on:
  push:
    branches:
    - master
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: 10.x
    - name: Install NPM deps
      run: |
          npm install
    - name: Generate hubspot.config.yml and deploy
      env:
        HUBSPOT_PORTAL_ID: ENTER_YOUR_ACCOUNT_ID
        HUBSPOT_API_KEY: ${{ secrets.HubSpotApiKey }}
      run: |
        bin/generate-config.js
        bin/deploy.sh
```

Replace `ENTER_YOUR_ACCOUNT_ID` with your HubSpot account ID. If you need help finding your HubSpot account ID, see Manage multiple HubSpot accounts. \${{ secrets.HubSpotApiKey }} will add your API key secret as an environmental variable in the deploy process, without having to store your API key visibly in source control.

##### Lint Action

You should also have a lint.yml file in your workflows directory. Lint means that when you are going to perform an action (here a push on the directory) then we are going to analyze your source code in order to know if it respects the good practices.

```
on: [push]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: 10.x
    - name: Install NPM deps
      run: |
          npm install
    - name: Lint
      run: |
          npm run eslint
```

#### Create a secret for your HubSpot account's API Key

To ensure your HubSpot account’s API key is not visible and stored in source control, we will create a secret for it, that will be passed into the deploy script as an environmental variable. In your GitHub repository, navigate to Settings > Secrets and select “Add a new secret”. Name your new secret HubSpotApiKey, and then enter your HubSpot account’s API key as the value. You can get the API key for your account by navigating to Settings > Integrations > API key, selecting "Create key," and then copying the key. Select “Add secret” to save your secret.

This key will be passed into ${{ secrets.HubSpotApiKey }} from your .github/workflows/deploy.yml file. If you name your secret something other than HubSpotApiKey, make sure to update the ${{ secrets.HubSpotApiKey }} variable with the secret name you set.

#### Commit your new file

If you have not already committed your new .github/workflows/deploy.yml file yo your master branch.

#### (Optionnal) - Lock your project in the Design Manager

<details>
<summary>Click to expand ! </summary>
Because the source of truth for your project now lives in GitHub, and master represents your live website, it is important to prevent edits made directly in the Design Manager. Changes to your live developer file system should only come through your deploy action. You can lock projects within the Design Manager by right-clicking on a folder and selecting “Lock folder” to prevent anyone from editing files in the Design Manager.

</details>

# Working
Hubspot doesn't allow the upload of SVG files in Design Tools. That's why this boilerplate includes an Icons module. The src/modules/icons.module/module.html file contains a SVG of all icons in src/icons. Add the Icons module in the 'Header' section of every template. That way you can use icons like:

```
<svg>
  <use href="#example" xlink:href="#example"></use>
</svg>
```

You can add your SVG icons to src/icons. Combining SVG and adding them to the Icons module is handled by Gulp.

## Manage Themes

### Theme field

The fields.json file will control the available fields in the theme editor sidebar. ( root directory)
Adding a new field to specify the H1 options :

```

// fields.json
{
    "type": "font",
    "name": "h1_font",
    "label": "Heading 1",
    "load_external_fonts": true,
    "default": {
        "color": "#494A52",
        "font": "Merriweather",
        "font_set": "GOOGLE",
        "variant": "700",
        "size": {
        "units": "px",
        "value": 48
        }
    }
},

```

### Reference the field in your css

To access a value in a theme, use the “theme” object. For example, you would use {{ theme.typography.h1_font.font }} to access the font-family set in our H1 font field.

All your theme changes should appear in the theme-overrides.css located in the src/ directory.
This is the only place where you can't sass because the compiler doesn't support hubl variables.

Here an example : 
```
h1 {
 	font-size: {{ theme.typography.h1_font.size.value }}{{ theme.typography.h1_font.size.units }};
 	font-style: {{ theme.typography.h1_font.styles|attr('font-style') }};
 	font-weight: {{ theme.typography.h1_font.styles|attr('font-weight')  }};
 	font-family: {{ theme.typography.h1_font.font }};
 	color: {{ theme.typography.h1_font.color }};
 	text-decoration: {{ theme.typography.h1_font.styles|attr('text-decoration') }};
    line-height: 1.3;
}

```

## Developing new templates

To be continued... ( just create html file )

note à moi même : ajouter un paragraphe sur les annotations


## Developing new modules

Use the command `yarn hs:module <name> src/modules` to create a new module. This will create a new folder in the modules folder. This folder contains the following files:

```
/fields.json
/meta.json
/module.css
/module.html
/module.js
```

Don't use the module.css and module.js files of a module. We only use the src/js folder and src/scss folder to edit css and javascript. More info : https://github.com/bradhave94/HubSpot/wiki/Custom-Modules-JSON

### Settings

Every module contains a meta.json file. This file contains properties with settings for the Hubspot module:

```
{
  "css_assets": [ ],
  "external_js": [ ],
  "global": true,
  "help_text": "",
  "host_template_types": [ "PAGE" ],
  "js_assets": [ ],
  "other_assets": [ ],
  "smart_type": "NOT_SMART",
  "tags": [ ],
  "is_available_for_new_content": true
}
```

To be able to use the new module in the Hubspot templates you should edit the meta.json file and change is_available_for_new_content to true.

If you need a global module, you can edit the property global and set it to true.

### Fields

Each module contains a `fields.json` file. This file contains all the fields a Hubspot user can edit to change the content of the module.

This boilerplate includes various fields utils `(/src/utils)`. Create a `/fields/fields.js` file in each module. Use this file to list which utils and custom fields should be used to build up a `fields.json` file (see Gulp buildModuleFields).

Example fields.js:

```
exports.config = function() {
  return [
    'src/modules/example.module/fields/content.json',
    'src/modules/example.module/fields/image.json',
    'src/utils/fields/padding.json',
    'src/utils/fields/mobile_padding.json'
  ]
}
```

### Github Workflow

<details>
  <summary>Click to expand!</summary>

#### Basics of Github - Skip this part if you're familiar with Git

##### About

By far, the most widely used modern version control system in the world today is Git. Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds, the famous creator of the Linux operating system kernel. A staggering number of software projects rely on Git for version control, including commercial projects as well as open source. Developers who have worked with Git are well represented in the pool of available software development talent and it works well on a wide range of operating systems and IDEs (Integrated Development Environments)

Having a distributed architecture, Git is an example of a DVCS (hence Distributed Version Control System). Rather than have only one single place for the full version history of the software as is common in once-popular version control systems like CVS or Subversion (also known as SVN), in Git, every developer's working copy of the code is also a repository that can contain the full history of all changes.

In addition to being distributed, Git has been designed with performance, security and flexibility in mind.

##### Commands

1. git config
   Utility : To set your user name and email in the main configuration file.
   How to : To check your name and email type in git config --global user.name and git config --global user.email. And to set your new email or name git config --global user.name = “Antoine Ravet" and git config --global user.email = “aravet@makethegrade.fr”

2. git init
   Utility : To initialise a git repository for a new or existing project.
   How to : git init in the root of your project directory.

3. git clone
   Utility : To copy a git repository from remote source, also sets the remote to original source so that you can pull again.
   How to : git clone <:clone git url:>

4. git status
   Utility : To check the status of files you’ve changed in your working directory, i.e, what all has changed since your last commit.
   How to : git status in your working directory. lists out all the files that have been changed.

5. git add
   Utility : adds changes to stage/index in your working directory.
   How to : git add .

6. git add
   Utility : adds changes to stage/index in your working directory.
   How to : git add .

7. git commit
   Utility : commits your changes and sets it to new commit object for your remote.
   How to : git commit -m”sweet little commit message”

8. git push/git pull
   Utility : Push or Pull your changes to remote. If you have added and committed your changes and you want to push them. Or if your remote has updated and you want those latest changes.
   How to : git pull <:remote:> <:branch:> and git push <:remote:> <:branch:>

9. git branch
   Utility : Lists out all the branches.
   How to : git branch or git branch -a to list all the remote branches as well.

10. git checkout
    Utility : Switch to different branches
    How to : git checkout <:branch:> or \*\*\_git checkout -b <:branch:> if you want to create and switch to a new branch.

11. git stash
    Utility : Save changes that you don’t want to commit immediately.
    How to : git stash in your working directory. git stash apply if you want to bring your saved changes back.

12. git merge
    Utility : Merge two branches you were working on.
    How to : Switch to branch you want to merge everything in. git merge <:branch_you_want_to_merge:>

13. git reset
    Utility : You know when you commit changes that are not complete, this sets your index to the latest commit that you want to work on with.
    How to : git reset <:mode:> <:COMMIT:>

14. git remote
    Utility : To check what remote/source you have or add a new remote.
    How to : git remote to check and list. And git remote add <:remote_url:>

##### Feature Branch Workflow

One of the biggest advantages of Git is its branching capabilities. Unlike centralized version control systems, Git branches are cheap and easy to merge. This facilitates the feature branch workflow popular with many Git users.
Feature branches provide an isolated environment for every change to your codebase. When a developer wants to start working on something—no matter how big or small—they create a new branch. This ensures that the master branch always contains production-quality code.

Using feature branches is not only more reliable than directly editing production code, but it also provides organizational benefits. They let you represent development work at the same granularity as the your agile backlog. For example, you might implement a policy where each Jira ticket is addressed in its own feature branch.

Here are the basic steps to start using feature branches in your project.

- Start on master
- Create a new feature branch
- Implement your changes on that branch
- Push the feature branch to your remote repo
- Create a pull request for your new changes

#### Github Workflow

##### Start on Master

When starting a new feature, I make sure to start with the latest and greatest of the codebase from the main development branch—this commonly referred to as master:

```
# switch to the master branch
git checkout master
# fetch the latest changes from the remote git repository
git pull origin master
```

This reduces complications of dealing with out-of-date code, and reduces the chances of merge issues.

##### Create a Feature Branch

Now, I create a local branch to house the changes required for the new feature.

Here again we are using the term ‘feature’ loosely. It’s a logical grouping of code and configuration changes to enable a new portion of the code, fix an issue, or improve existing code. The idea is to use your best judgement and to try to keep the scope of the changes limited to a single logical issue.

`git checkout -b new_super_feature_mtg`

This will create a new branch called new_super_feature_mtg and check it out. We can think of this new branch as a copy of master, because it was what we had checked out, and it keeps the contents just as they were. We can now make new changes in our new branch without affecting the master branch.

##### Modify Code

Now, we implement the new feature / bug fix. Work as you would normally, making small incremental changes and checking them into the local feature branch.

Use descriptive comments when adding new changes so the history of changes is easy to follow. They can still be short and succinct, but be clear.

One useful way to think about commit messages is that together they make up the recipe for your project. “Add linting to application code” or “Add minification step” are very clear explanations for what your code is doing.

Clear commits allow your team to stay up to date with what’s happening in the code-base. They keep others more informed about the changes being made. They also help when you are looking back at the history of the project (usually when you are trying to understand when a bug was introduced). Seeing clear commit messages in your git history can help you hone in on issues a lot more quickly. And, as your project and team grow it can be worthwhile to standardize on commit message content and format, similarly to how you might with coding styles.

##### Push Feature Branch to Remote

Ok, you are done with the implementation. You’ve checked and double checked the changes, and you are now ready to have them integrated into the main code base.

The first step of the review process is to push your feature branch to `origin`.

`git push origin new_super_feature_mtg`

##### Create Pull Request

With your feature branch now pushed, navigate to the project’s GitHub page (you could also check out hub which provides command line tools for working with GitHub, in this case hub browse would open the GitHub project page for you). On the main page, you should see a new little toolbar that shows your feature branch listed and asks if you want to create a pull request from it. So let’s do it!

![alt text](https://static.bocoup.com/blog/git-workflow/pr_option.png)

When creating a pull request (or PR, as they are known by all the cool kids these days), you want to summarize the changes being made for this new feature and give it a descriptive title.

You can reference existing issues or other PR’s by typing ‘#’ followed by the issue number or any word from the issue title. A little pop-up should help with picking the right issue number.

</details>