<?php

$img = glob("../data/img/hzw.*jpg");

foreach ($img as $v) {
    echo "![.m23](../img/".basename($v).")", PHP_EOL;
}