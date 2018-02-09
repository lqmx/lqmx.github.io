<?php

include "../dep/Parsedown.php";

$config = parse_ini_file("./config.ini");

$parsedown = new Parsedown();
$v = time();
$base = <<<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="update_time" content="$v">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>%s</title>
    <link rel="stylesheet" href="../../css/reset.css?v$v">
    <link rel="stylesheet" href="../../css/md.css?v$v">
    <link rel="stylesheet" href="../../js/drawboard/draw_board.css?v$v">
    <link rel="stylesheet" href="../../js/catalog/catalog.css?v$v">
    <link rel="stylesheet" href="../../js/cmdbar/cmd_bar.css?v$v">
    <link rel="stylesheet" href="../../js/catalog/catalog.css?v$v">
    <link rel="stylesheet" href="../../js/note/note.css?v$v">
    <link rel="stylesheet" href="../../dep/highlight/style/monokai_sublime.css?v$v">
</head>
<body>
    <div class="md">%s</div>
    <script src="../../dep/jquery.js?v$v"></script>
    <script src="../../js/comm/keyevent.js?v$v"></script>
    <script src="../../js/catalog/Catalog.js?v$v"></script>
    <script src="../../js/drawboard/DrawBoard.js?v$v"></script>
    <script src="../../js/cmdbar/CmdBar.js?v$v"></script>
    <script src="../../js/drag/Drag.js?v$v"></script>
    <script src="../../js/catalog/Catalog.js?v$v"></script>
    <script src="../../js/note/Note.js?v$v"></script>
    <script src="../../js/html.js?v$v"></script>
    <script src="../../dep/highlight/highlight.min.js?v$v"></script>
    <script>hljs.initHighlightingOnLoad();</script>
</body>
</html>
HTML;

echo "BEGIN...", PHP_EOL;
if($argc >=2 ) {
    $files = array_splice($argv, 1);
    foreach ($files as $md) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        $markdown = file_get_contents($config['md_dir'].$md.".md");
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($config['html_dir'].$url.".html", $html);
        echo $config['html_dir'].$url.".html", PHP_EOL;
    }
}
else {
    $mds = glob($config['md_dir']."*.md");
    foreach ($mds as $md) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        if($type == 'ing') {
            continue;
        }
        $markdown = file_get_contents($md);
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($config['html_dir'].$url.".html", $html);
        echo $config['html_dir'].$url.".html", PHP_EOL;
    }
}
echo "DONE", PHP_EOL;
