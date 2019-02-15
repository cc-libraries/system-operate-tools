# system-operate-tools
a series tools for you to operate your system

# notice:
## install sqlite3 for electron
compile for you electron version. **target** is electron version

for **mac**:

`npm install robotjs --build-from-source --runtime=electron --target=4.0.1`

for **windows**:

`npm install robotjs --build-from-source --runtime=electron --target=4.0.1 --msvs_version=2015`

rebuild for **all platforms**:

`npm rebuild --runtime=electron --target=4.0.1 --disturl=https://atom.io/download/atom-shell --abi=64`

## install clipboard for electron:
for **mac**:

`npm install clipboard git+https://github.com/hello-chenchen/node-clipboard-api-adapter.git --build-from-source --runtime=electron --target=4.0.1`

### FIXED:
Q:`error MSB8020: The build tools for v140 (Platform Toolset = 'v140') cannot be found. To build using the v140 build tools, please install v140 build tools.  Alternatively, you may upgrade to the current Visual Studio tools by selecting the Project menu or right-click the solution, and then selecting "Retarget solution".`

A:`npm install --global --production windows-build-tools --vs2015`