---
layout: post
title:  How to Install the Latest Version of Python on the Raspberry Pi
categories: productivity
date:   2021-06-02
---

I love tinkering with the Raspberry Pis, but one annoying thing about the [Raspberry Pi OS]("https://www.raspberrypi.org/software/")  (previously called Raspbian) is that it doesn't always ship with the latest version of Python. As of this writing, that's Python version 3.9.5. 
*(Note: To use this tutorial for a newer version of Python, you just need to modify any references to **3.9.5** to the version you want.)*

To install the latest version of Python, we have to build it from the source and install it. I will walk through the steps that I followed to get up and running. 

## Build
To get started, we need to fire up the terminal and install the dependencies.:
```bash
sudo apt-get update

sudo apt-get install -y build-essential libbz2-dev libdb5.3-dev libexpat1-dev libffi-dev libgdbm-dev liblzma-dev libncurses5-dev libncursesw5-dev libreadline6-dev libsqlite3-dev libssl-dev tk-dev zlib1g-dev 
```

Now we download the latest version of Python using *wget*. At this time, the newest version is Python-3.9.5. You can check the listings from the ftp site [here]("https://www.python.org/ftp/python/"):
```bash
wget https://www.python.org/ftp/python/3.9.5/Python-3.9.5.tar.xz
```

Extract the files with *tar*:
```bash
tar xf Python-3.9.5.tar.xz
```

Enter extracted directory and compile. Running 4 simultaneous jobs should be good for the Pi 3/4 with the *make* command:
```bash
cd Python-3.9.5
./configure --prefix=/usr/local/opt/python-3.9.5
make -j 4
```
## Install
Now install with:
```bash
sudo make altinstall
```

You can now remove the files that you downloaded and unpacked:
```bash
cd ..
sudo rm -r Python-3.9.5
rm Python-3.9.5.tar.xz
```

Create an alias for your newly installed Python in your *.bashrc* file.
Open the *.bashrc* file with your chosen editor, vim, nano, etc. I'll use nano in this example:
```bash
nano ~/.bashrc
```
Add the following at the end of the file:
```bash
alias python=/usr/local/opt/python-3.9.5/bin/python3.9
```

## Run
Restart your terminal or reload bash: 
```
. ~/.bashrc
```

Verify your Python version:
```shell
python --version
```
 and you should get:
```shell
$ Python 3.9.5
```
That's it! Now you should be ready to start building your next cool project with the latest version of Python on your Raspberry Pi.
Happy hacking :-)