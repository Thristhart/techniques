---
title: OSX Development environment
categories: 
  - osx
  - programming
published: true
---


As a front end engineer at [Verve](https://vervemobile.com) I've had to get used to working on a macbook -- not exactly the linux-over-ssh development environment I'm used to. But OSX is still Unix, and it doesn't take too much tweaking to make it very nice. Here's my ad development setup:
<h2>Terminal</h2>
First step is to pin the terminal to the dock, because I use it all the time.
![pin_terminal_to_dock.png](assets/pin_terminal_to_dock.png)
Then I go into the terminal settings and add background transparency, because it looks cool as hell:
![transparent_terminal.png](assets/transparent_terminal.png)

Now we want to set up a nice bash prompt. I like having a seperator to visually separate commands. I'd also like to have some useful information such as timestamp, current directory and git status on my prompt. All of this becomes a bit unwieldy to put in PS1, so I'm using PROMPT_COMMAND and a bash file at `~/.bash_prompt`. 
Here's my `~/.profile`:

    export PROMPT_COMMAND='export PROMPT=$(~/.bash_prompt)'
    yellow=$(tput setaf 3)
    reset=$(tput sgr0)
    export PS1="\$PROMPT\n\[$yellow\]\w)\[$reset\] ";

    
And here's `~/.bash_prompt`:

    #!/bin/bash
    source ~/.git-prompt.sh
    
    export GIT_PS1_SHOWDIRTYSTATE=TRUE
    export GIT_PS1_SHOWUNTRACKEDFILES=TRUE
    export GIT_PS1_SHOWUPSTREAM='verbose count name'
    
    data=$(__git_ps1 '%s | ')$(date +"%r")
    datalength=${#data}
    
    cols=$(tput cols);
    cols=$((cols-datalength))
    
    s=$(printf "%*s" $cols);
    export PROMPT_SEPERATOR=$(echo "${s// /―}");
    
    echo -e "$(tput setaf 2)$PROMPT_SEPERATOR$(tput bold)$data$(tput sgr0)"


`~/.git-prompt.sh` is <a href="https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh">git-prompt.sh</a>, a very useful helper script for putting git repo status in your prompt.

I combine it plus the date function to get the `data` variable, which looks something like: `encode-task u= origin/encode-task | 02:50:09 PM`. Then I subtract the length of that from the width of the terminal to get how many "filler" characters I need to build the seperator. Finally I use printf and some substitution magic to generate exactly enough dashes to fill the width of the terminal + the miscellaneous data.

Here's what this ends up looking like:
![bash_prompt.png](assets/bash_prompt.png)

<h2>Tools</h2>
Next step is to get XCode, which has build tools and most importantly comes with iOS Simulator, which is very useful for testing a variety of configurations of Safari for our ad builds.

I'm using Xcode-beta, (as of this writing, version 7.3) because I like experimental features. I launch iOS Simulator via right clicking on the Xcode dock icon, Open Developer Tool, Simulator. I then pin the iOS simulator to the dock in the same way I pinned Terminal so that I don't need to launch XCode to open iOS simulator.

[Homebrew](http://brew.sh/) is a package manager for OSX and is a lifesaver. I've used it to install node (`brew install node`) and cmake.

I use the [Dev channel](https://www.google.com/chrome/browser/desktop/index.html?platform=mac&extra=devchannel) for Chrome, which has the best balance of stability to cool features. (There's a lot of even cooler features in Canary, but it's not stable enough for production use.)

<h2>Text editor</h2>
I'm a big Vim fan, especially because of the very large number of plugins and community configuration available for it. I use [Macvim](https://github.com/b4winckler/macvim) with [YouCompleteMe](https://github.com/Valloric/YouCompleteMe), compiled with clang and [tern](https://github.com/ternjs/tern_for_vim) support.
