#!/bin/sh

cd ${0%%build.sh*}
php combine_css.php
php md2html.php
php build_index.php
cd -