<?php

$config = parse_ini_file("./config.ini");

$v = time();
$base = file_get_contents("tpl/index.html");
$base = str_replace('$v', $v, $base);

$paperDiv = file_get_contents("tpl/paper.html");
$noteItemDiv = file_get_contents("tpl/note_item.html");

$htmlNotePapers = "";
$htmlNoteList = "";

$files = glob($config['md_dir']."*.md");

$readme = "README";
$files[] = $readme.".md";

$types = array();


$notes = [];
$notes = file_get_contents("./notes.json");
$notes = !empty($notes)?json_decode($notes, true):[];

foreach ($files as $file) {

    $filename = basename($file, '.md');

    // ..
    if($filename == $readme) {
        $date = date("Ymd", time());
        $title = $readme;
        $url = $readme;
        $type = 'intro';
    }
    else {
        list($date, $type, $url, $title) = explode ('.', $filename);
        if($type == 'ing') continue;
    }

    // ..
    if(!in_array($type, $types)) $types[] = $type;

    // ..
    $img = glob($config['img_dir']."$url*");
    $imgDiv = "";
    if(!empty($img) and count(explode('.', basename($img[0])))==2) {
        $imgDiv = '<img src="data/img/' . basename($img[0]) . '" draggable="false">';
    }

    // ..
    $dateFormat = date("d M Y", strtotime($date));
    $htmlNotePapers .= sprintf($paperDiv, $type, $url, $date, "bg-$type", $imgDiv, $title, $dateFormat);
    $htmlNoteList .= sprintf($noteItemDiv, "border-$type", $title, $type, $url, $date, $title, $dateFormat);


    // ..
    if(!isset($notes[$url])){
        $notes[$url] = array(
            'type' => $type,
            'url' => $url,
            'title' => $title,
            'date' => $date,
            'isBg' => !empty($img),
            'bg' => !empty($img) ? basename($img[0]) : '',
            'bgColor' => "bg-$type",
        );
    }
}

// ..
$html = sprintf($base, $htmlNotePapers, $htmlNoteList);
file_put_contents("../index.html", $html);

// ..
$notesData = <<<NOTEDATA
define(function (require) {
    return %s;
});
NOTEDATA;

// ..
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
