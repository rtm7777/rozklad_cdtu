RozkladCDTU
=========
WebApp for showing and editing the students schedule, written with Revel[\[1\]][1] web framework.  
When my Raspberry Pi is powered on, this project is also available here: [rozklad.rasp.tk](http://rozklad.rasp.tk)

[![Build Status](https://travis-ci.org/rtm7777/rozklad_cdtu.svg?branch=master)](https://travis-ci.org/rtm7777/rozklad_cdtu)

# How to run this project:
1. Install Google Go (_ver. 1.3+_), I use [GoVM](https://coderwall.com/p/21svdq/how-do-you-manage-go-s-version-let-s-use-govm).
2. Create `gocode` directory in HOME.
3. Add env. variables to `.bashrc`
       export GOPATH=~/gocode
       export PATH="$PATH:$GOPATH/bin"
       export GOVM_ROOT=~/.govm
       export GOROOT=$GOVM_ROOT/versions/current
       export PATH=$GOROOT/bin:$PATH
4. Install [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Mercurial](http://mercurial.selenic.com/wiki/Download).
5. Install Revel Web Framework  
       go get github.com/revel/revel
6. Install Revel cmd tool:  
       go get github.com/revel/cmd/revel 
       go build -o bin/revel github.com/revel/cmd/revel
7. Go to `HOME/gocode/src/` and clone this project with using **Git**  
       git clone https://github.com/rtm7777/rozklad_cdtu.git
8. Run project
       revel run rozklad_cdtu
P.S. After running you may have errors related with missed packages. just install it with using `go get package_name`

####Additional resources, used in this project:

 - [Bootstrap][2]
 - [jQuery][3]
 - [RequireJS][4]
 - [GORM][5]

  [1]: http://revel.github.io/index.html
  [2]: https://github.com/twbs/bootstrap
  [3]: https://github.com/jquery/jquery
  [4]: https://github.com/jrburke/requirejs
  [5]: https://github.com/jinzhu/gorm