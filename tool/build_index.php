<?php

$config = parse_ini_file("./config.ini");

$v = time();
$base = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="update_time" content="$v">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>lazy note</title>
    <link rel="stylesheet" href="css/reset.css?v$v">
    <link rel="stylesheet" href="css/style.css?v$v">
     <link rel="stylesheet" href="js/cmdbar/style/cmd_bar.css?v$v">
</head>
<body>
<div class="table">
%s
</div>
<canvas class="draw-board"><span>浏览器不支持canvas</span></canvas>
<script src="dep/jquery.js?v$v"></script>
<script src="js/cmdbar/CmdBar.js?v$v"></script>
<script src="js/index.js?v$v"></script>
</body>
</html>
HTML;

$paperDiv = <<<PAPER_DIV
<div class="paper" data-url="%s">
    <div class="title">%s</div>
    <div class="date">%s</div>
</div>

PAPER_DIV;

$files = glob($config['md_dir']."*.md");
$papers = "";

foreach ($files as $file) {
    $filename = basename($file, '.md');
    list($date, $type, $url, $title) = explode('.', $filename);
    $papers .= sprintf($paperDiv, $url, $title, $date);;
}

$html = sprintf($base, $papers);
file_put_contents("../index.html", $html);