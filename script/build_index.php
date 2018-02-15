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


$v = time();
$base = file_get_contents("tpl/index.html");
$base = str_replace('$v', $v, $base);

$paperDiv = file_get_contents("tpl/paper.html");

$files = glob($config['md_dir']."*.md");
$papers = "";

$readme = "README";
$files[] = $readme.".md";
$notes = [];
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
    $bg = 'bg-' . (isset($types[$type])?$types[$type]:0);
    $img = glob($config['img_dir']."$url*");
    $imgDiv = "";
    if(!empty($img)) {
        $imgDiv = '<img src="data/img/' . basename($img[0]) . '">';
    }
    $papers .= sprintf($paperDiv, $url, $bg, $imgDiv, $title, date("d M Y", strtotime($date)));
    $notes[$url] = array(
        'type' => $type,
        'url' => $url,
        'title' => $title,
        'date' => $date,
        'isBg' => !empty($img),
        'bg' => !empty($img) ? basename($img[0]) : '',
        'bgColor' => $bg,
    );
}

$html = sprintf($base, $papers);
file_put_contents("../index.html", $html);
$notesData = <<<NOTEDATA
define(function (require) {
    return %s;
});
NOTEDATA;

file_put_contents("../js/notes.js", sprintf($notesData, json_encode($notes)));