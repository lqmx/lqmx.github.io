<?php

include "../dep/Parsedown.php";

$output = "../note/";
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
    <link rel="stylesheet" href="../css/reset.css?v$v">
    <link rel="stylesheet" href="../css/md.css?v$v">
    <link rel="stylesheet" href="../dep/highlight/style/monokai_sublime.css?v$v">
<title>%s</title>
</head>
<body>
  <div class="md">%s</div>
    <script src="../dep/highlight/highlight.min.js?v$v"></script>
    <script>hljs.initHighlightingOnLoad();</script>
</body>
</html>
HTML;

$dir = "../data/md/";

echo "BEGIN...", PHP_EOL;
if($argc >=2 ) {
    $files = array_splice($argv, 1);
    foreach ($files as $md) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        if($type == 'ing') continue;
        $markdown = file_get_contents($dir.$md);
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($output.$url.".html", $html);
        echo $output.$url.".html", PHP_EOL;
    }
}
else {
    $mds = glob($dir."*.md");
    foreach ($mds as $md) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        if($type == 'ing') {
            continue;
        }
        $markdown = file_get_contents($md);
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($output.$url.".html", $html);
        echo $output.$url.".html", PHP_EOL;
    }
}
echo "DONE", PHP_EOL;
