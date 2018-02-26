#!/bin/bash

cd src
esvalidate bot.js

if [ -f bot ]; then
  mv * ../build/bot/
fi
