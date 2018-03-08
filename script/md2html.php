<?php

include "../dep/Parsedown.php";

$config = parse_ini_file("./config.ini");

$parsedown = new Parsedown();
$v = time();
$base = file_get_contents("./tpl/note.html");
$base = str_replace('$v', $v, $base);

$file_flag = file_get_contents(".fileflag");
$file_flag = empty($file_flag)?[]:json_decode($file_flag, true);

$all = ($argc >= 2 and $argv[1] == 'all') ? true : false;
$force = ($argc >= 2 and $argv[1] == 'f') ? true : false;

$mds = glob($config['md_dir']."*.md");
$readme = "../README.md";
$mds[] = $readme;
foreach ($mds as $md) {

    if($md != $readme) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        if($type == 'ing') continue;
    } else {
        $url = $filename = "README";
    }

    $markdown = file_get_contents($md);
    $file_md5 = md5($markdown);

    if(!$all and isset($file_flag[$url]) and $file_flag[$url] == $file_md5) continue;

    $fp = file($md);
    $fp = array_slice($fp, 0, count($fp)-1);
    $nowDate = '###### '.date("Y.m.d", time());
    $fp[] = $nowDate;
    $markdown = implode("", $fp);

    $file_flag[$url] = $file_md5;
    $html = $parsedown->text($markdown);
    $html = sprintf($base, $filename, $html);

    file_put_contents($md, $markdown);
    file_put_contents($config['html_dir'].$url.".html", $html);

    echo $filename, PHP_EOL;
}

file_put_contents(".fileflag", json_encode($file_flag));