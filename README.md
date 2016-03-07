# Pickr
An awesome application for randomizing volunteers.

## Get Started
1. **Initial Machine Setup**. Before anything else, be sure to complete the [Initial Machine Setup](https://github.com/megatricycle/pickr#initial-machine-setup).
2. **Clone the project**. `git clone https://github.com/megatricycle/pickr.git`.  
3. **Install Node packages**. `npm install`
4. **Run the app**. `npm start -s`  
This will run the automated build process, start up a browsersync server proxied to an Express API server, and open the application in your default browser. When doing development with this kit, you'll want to keep the command line open at all times so that your code is rebuilt and tests run automatically every time you hit save. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.

##Initial Machine Setup
1. **Install [Node 4.0.0 or greater](https://nodejs.org)**
2. **Install [Git](https://git-scm.com/downloads)**. 
3. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome. (Optional, but helpful. The latter offers time-travel debugging.)
4. **Install [sequelize/cli](https://github.com/sequelize/cli)**. 
5. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  
 
**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` 

**On Windows:** 
 
 * **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
 * **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).
 
## Note
This project was based from [react-trebuchet](https://github.com/barrystaes/react-trebuchet). It was modified to proxy requests to an Express server.

## Project Management Tool
Refer to [overv.io](https://overv.io).
