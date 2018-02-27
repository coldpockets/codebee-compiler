#!/bin/bash

cd src
g++ -o bot helper-package/*.cpp bot.cpp

if [ -f bot ]
then
  mv bot ../build/
fi
