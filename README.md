# system-operate-tools
a series tools for you to operate your system

## NOTICED!!!
  **Not all the branches support all these informations in the below. Actually, master branch is the most stable and less features. And in most situations, you can find these feature by the key words in name of branch. If you still have question please create issue in 'help wanted' label.**

## Suport Platforms
- Linux (Current ubuntu 16.04 default desktop tested)
- Mac OS (Current 10.12.6 tested)
- Windows (Current Windows 10 2016 LTS Version tested)

## Dependence
- This project is depends on [node-clipboard](https://github.com/hello-chenchen/node-clipboard.git)

## The Code Style
- Please Read: [cc-code-style](https://github.com/hello-chenchen/cc-code-style)

## Used Technologies
- electron
- es2015
- antd
- react
- webpack
- sqlite3 native module compile
- gyp

## Issues
- **issue list:** https://github.com/hello-chenchen/system-operate-tools/issues
- The solution of some fixed bugs will be highlight in FIXED

# notice:
## install node-module-xxx for electron
compile for you electron version. **target** is electron version

for **mac**|**linux**:

`npm install node-module-xxx --build-from-source --runtime=electron --target=4.0.1`

for **windows**:

`npm install node-module-xxx --build-from-source --runtime=electron --target=4.0.1 --msvs_version=2015`

rebuild for **all platforms**:

`npm rebuild --runtime=electron --target=4.0.1 --disturl=https://atom.io/download/atom-shell --abi=64`

## e.g: install clipboard for electron:
for **mac**:

`npm install clipboard git+https://github.com/hello-chenchen/node-clipboard.git --build-from-source --runtime=electron --target=4.0.1 --disturl=https://atom.io/download/atom-shell`

### FIXED:
Q:`error MSB8020: The build tools for v140 (Platform Toolset = 'v140') cannot be found. To build using the v140 build tools, please install v140 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Retarget solution".`

A:`npm install --global --production windows-build-tools --vs2015`
