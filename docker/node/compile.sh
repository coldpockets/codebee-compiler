#!/bin/bash

cd src
>&2 esvalidate bot.js

mv * ../build/
