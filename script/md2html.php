<?php

include "../dep/Parsedown.php";

$config = parse_ini_file("./config.ini");

$parsedown = new Parsedown();
$v = time();
$base = file_get_contents("./tpl/note.html");

echo "BEGIN...", PHP_EOL;
if($argc >=2 ) {
    $files = array_splice($argv, 1);
    foreach ($files as $md) {
        list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
        $markdown = file_get_contents($config['md_dir'].$md.".md");
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($config['html_dir'].$url.".html", $html);
    }
}
else {
    $mds = glob($config['md_dir']."*.md");
    $readme = "../README.md";
    $mds[] = $readme;
    foreach ($mds as $md) {
        if($md != $readme) {
            list(, $type, $url, $filename) = explode('.', basename($md, '.md'));
            if($type == 'ing') {
                continue;
            }
        } else {
            $url = $filename = "README";
        }
        $markdown = file_get_contents($md);
        $html = $parsedown->text($markdown);
        $html = sprintf($base, $filename, $html);
        file_put_contents($config['html_dir'].$url.".html", $html);
    }
}
echo "DONE", PHP_EOL;
