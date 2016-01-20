---
title: OSX Development environment
categories: 
  - osx
  - programming
published: false
---
As a front end engineer at [Verve](https://vervemobile.com) I've had to get used to working on a macbook -- not exactly the linux-over-ssh development environment I'm used to. But OSX is still Unix, and it doesn't take too much tweaking to make it very nice. Here's my ad development setup:
## Terminal
First step is to pin the terminal to the dock, because I use it all the time.
![pin_terminal_to_dock.png]({{site.baseurl}}/assets/pin_terminal_to_dock.png)
Then I go into the terminal settings and add background transparency, because it looks cool as hell:
![transparent_terminal.png]({{site.baseurl}}/assets/transparent_terminal.png)

Now we want to set up a nice bash prompt. I like having a seperator to visually separate commands. I'd also like to have some useful information such as timestamp, current directory and git status on my prompt. All of this becomes a bit unwieldy to put in PS1, so I'm using PROMPT_COMMAND and a bash file at `~/.bash_prompt`. 
Here's my `~/.profile`:
```
export PROMPT_COMMAND='~/.bash_prompt'
export PS1="\033[33m\w)\e[0m ";
```
And here's `~/.bash_prompt`:
```
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

echo -e "\033[32m$PROMPT_SEPERATOR$(tput bold)$data$(tput sgr0)"
```
`~/.git-prompt.sh` is https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh, a very useful helper script for putting repo status in your prompt.

I combine it plus the date function to get the `data` variable, which looks something like: "encode-task u= origin/encode-task | 02:50:09 PM". Then I subtract the length of that from the width of the terminal to get how many "filler" characters I need to build the seperator. Finally I use printf and some substitution magic to generate exactly enough dashes to fill the width of the terminal + the miscellaneous data.

Here's what this ends up looking like:
![bash_prompt.png]({{site.baseurl}}/assets/bash_prompt.png)
