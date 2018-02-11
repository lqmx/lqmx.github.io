<?php

$config = parse_ini_file("./config.ini");

$v = time();
$base = file_get_contents("tpl/index.html");
$base = str_replace('$v', $v, $base);

$paperDiv = file_get_contents("tpl/paper.html");


$files = glob($config['md_dir']."*.md");
$papers = "";

$readme = "README";
$files[] = $readme.".md";
foreach ($files as $file) {
    $filename = basename($file, '.md');
    if($filename == $readme) {
        $date = date("Ymd", time());
        $title = $readme;
        $url = $readme;
    }
    else {
        list($date, $type, $url, $title) = explode ('.', $filename);
        if($type == 'ing')
            continue;
    }
    $papers .= sprintf($paperDiv, $url, $title, $date);
}

$html = sprintf($base, $papers);
file_put_contents("../index.html", $html);