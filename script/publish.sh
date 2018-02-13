#!/bin/sh

cd ${0%%publish.sh*}
git add ../data/html/* ../data/img/*
git ci -m '..' ../data/html/* ../data/img/*
git push
cd -