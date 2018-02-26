#!/bin/bash

echo "hello"

cd src
g++ -o bot helper-package/*.cpp bot.cpp

if [ -f bot ]
then
  mv bot ../build/
  ls ../build
  touch ../build/test123
fi
