<?php

$config = parse_ini_file("./config.ini");

$now = $v = time();
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
    $htmlNoteList .= sprintf($noteItemDiv, "border-$type", $type, $url, $date, $title, $dateFormat);


    // ..
    if(!isset($notes[$url])){
        $notes[$url] = array(
            'type' => $type,
            'url' => $url,
            'title' => $title,
            'date' => $date,
            'isBg' => !empty($imgDiv),
            'bg' => !empty($imgDiv) ? basename($img[0]) : '',
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

// ..
$catalog = array();
$typename = array (
    'web' => "WEB",
    'it' => "IT",
    'memo' => '备忘',
    'algorithm' => '算法',
    'php' => 'PHP',
    'js' => 'JS',
    'literature' => '文学',
    'mysql' => 'MySQL',
    'snippet'  => '代码片',
    'comic' => '动漫',
    'cheatsheet' => 'CheatSheet',
    'network' => '网络',
    'interview' => '面试',
    'lyric' => '歌词',
    'game' => '游戏',
    'intro' => '简介',
);


foreach ($notes as $v) {
    if(!isset($catalog[$v['type']])) $catalog[$v['type']] = array();
    $catalog[$v['type']][] = $v;
}

$updateTime = date('Y.m.d', $now);
$catalogMd = <<<CATALOGMD
# 目录

###### 2018.03.09

%s

###### $updateTime
CATALOGMD;

$strCatalog = "";

foreach ($catalog as $k => $v) {
    $strCatalog .= "# " . (isset($typename[$k])?$typename[$k]:'其他') . PHP_EOL .PHP_EOL;
    foreach ($v as $vv) {
        $strCatalog .= "[{$vv['title']}](https://lqmx.github.io/data/html/{$vv['url']})" . PHP_EOL . PHP_EOL;
    }
}

$catalogMd = sprintf($catalogMd, $strCatalog);

file_put_contents("../CATALOG.md", $catalogMd);


//$c = <<<COLOR
//.bg-%s {
//    background: #FC3A52;
//}
//COLOR;
//
//foreach ($types as $v) {
//    echo sprintf($c, $v), PHP_EOL;
//}
