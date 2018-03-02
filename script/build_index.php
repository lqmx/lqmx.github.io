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
$notes = [];
$notes = file_get_contents("./notes.json");
$types = array();
if(!empty($notes)) {
    $notes = json_decode($notes, true);
} else {
    $notes = [];
}
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
    if(!in_array($type, $types)) $types[] = $type;
    $bg = 'bg-' . $type;
    $img = glob($config['img_dir']."$url*");
    $imgDiv = "";
    if(!empty($img) and count(explode('.', basename($img[0])))==2) {
        $imgDiv = '<img src="data/img/' . basename($img[0]) . '" draggable="false">';
    }
    $papers .= sprintf($paperDiv, $type, $url, $bg, $imgDiv, $title, date("d M Y", strtotime($date)));


    if(!isset($notes[$url])){
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
}

$html = sprintf($base, $papers);
file_put_contents("../index.html", $html);
$notesData = <<<NOTEDATA
define(function (require) {
    return %s;
});
NOTEDATA;

file_put_contents("../js/notes.js", sprintf($notesData, json_encode($notes)));
file_put_contents("./notes.json", json_encode($notes));

//$c = <<<COLOR
//.bg-%s {
//    background: #FC3A52;
//}
//COLOR;
//
//foreach ($types as $v) {
//    echo sprintf($c, $v), PHP_EOL;
//}
