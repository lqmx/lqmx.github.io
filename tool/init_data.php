<?php

$dir = "../data/md/";
$files = glob($dir."*.md");

$notes = array();
foreach ($files as $file) {
    $filename = basename($file, '.md');
    $note = array();
    list($note['date'], $note['type'], $note['url'], $note['title']) = explode('.', $filename);
    $notes[] = $note;
}
file_put_contents("../data/data.js", "var notes=".json_encode($notes).";");