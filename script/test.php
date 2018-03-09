<?php


$file = glob('../data/img/lvxingqingwa*');

$str = "";
foreach ($file as $v) {
    $name = basename($v);
    $str .= "![.m43](../img/$name)" . PHP_EOL;
}

file_put_contents('./test.md', $str);