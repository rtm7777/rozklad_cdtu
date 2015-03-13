RozkladCDTU
=========
WebApp for showing and editing the students schedule, written with Revel[\[1\]][1] web framework.  
When my Raspberry Pi is powered on, this project is also available here: [rozklad.rasp.tk](http://rozklad.rasp.tk)

[![Build Status](https://travis-ci.org/rtm7777/rozklad_cdtu.svg?branch=master)](https://travis-ci.org/rtm7777/rozklad_cdtu)

# How to run backend part of project:
1. Install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Mercurial](http://mercurial.selenic.com/wiki/Download).

2. Install Google Go (_ver. 1.3+_), I use [GoVM](https://coderwall.com/p/21svdq/how-do-you-manage-go-s-version-let-s-use-govm).

3. Create `gocode` directory in HOME.

4. Add env. variables to `.bashrc`

    ```bash
    export GOPATH=~/gocode
    export PATH="$PATH:$GOPATH/bin"
    export GOVM_ROOT=~/.govm
    export GOROOT=$GOVM_ROOT/versions/current
    export PATH=$GOROOT/bin:$PATH
    ```

5. Install Revel Web Framework

    ```bash
    go get github.com/revel/revel
    ```

6. Install Revel cmd tool:

    ```bash
    go get github.com/revel/cmd/revel
    cd gocode
    go build -o bin/revel github.com/revel/cmd/revel
    ```

7. Go to `HOME/gocode/src/` and clone this project with using **Git**

    ```bash
    git clone https://github.com/rtm7777/rozklad_cdtu.git
    ```

8. Run project

    ```bash
    revel run rozklad_cdtu
    ```

P.S. After running you may have errors related with missed packages. just install it with using `go get ./...`

# How to run frontend part of project:
1. Install [Node](https://nodejs.org/) and [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server).

2. Go to project folder and install dependencies.

    ```bash
    npm install
    ```

3. Build all frontend.

    ```bash
    npm run build_all
    ```

4. If need recompile only js, run:

    ```bash
    npm run build
    npm run build_min
    ```

5. Run js watcher by next command:

    ```bash
    npm run watch
    ```

  [1]: http://revel.github.io/index.html