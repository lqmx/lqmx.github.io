<?php

$readme =  "../README.md";
$mds[] = $readme;
foreach ($mds as $md) {
    if($md != $readme) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        if($type == 'ing') {
            continue;
        }
    } else {
        $url = "README";
    }
    $markdown = file_get_contents($md);
    echo $markdown, PHP_EOL;
//    $html = $parsedown->text($markdown);
//    $html = sprintf($base, $filename, $html);
//    file_put_contents($config['html_dir'].$url.".html", $html);
//    echo $config['html_dir'].$url.".html", PHP_EOL;
}