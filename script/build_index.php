<?php

$config = parse_ini_file("./config.ini");

$types = array(
    'web' => 1,
    'it' => 2,
    'memo' => 3,
    'algorithm' => 4,
    'php' => 5,
    'js' => 6,
    'literature' => 7,
    'mysql' => 'mysql',
    'snippet' => 'snippet',
);

// left: 402.58px; top: 330.74px; transform: rotate(332deg);

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
        $type = 'intro';
    }
    else {
        list($date, $type, $url, $title) = explode ('.', $filename);
        if($type == 'ing')
            continue;
    }
    $bg = isset($types[$type])?$types[$type]:0;
    $papers .= sprintf($paperDiv, $url, 'card-bg-'.$bg, $title, date("d M Y", strtotime($date)));
}

$html = sprintf($base, $papers);
file_put_contents("../index.html", $html);