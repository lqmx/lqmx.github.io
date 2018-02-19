<?php

$v = time();

$htmlMain = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Daily Card</title>
    <link rel="stylesheet" href="build.css?v$v">
</head>
<body>
<div class="table">
%s
</div>
<script src="build.js?v$v"></script>
</body>
</html>
HTML;



$htmlCard = <<<CARD
<div class="card">
        <div class="circle"></div>
        <div class="main">
            <img src="../img/%s" alt="" draggable="false">
        </div>
        <div class="footer">
            <div class="content">%s</div>
            <div class="date">%s</div>
        </div>
    </div>
CARD;


$filePath = "dailycard.md";


$content = file_get_contents($filePath);
$dailyCard = array_filter(explode("\n", $content));
unset($dailyCard[0]);


$html = "";
if(count($dailyCard)%3==0) {
    $dailyCard = array_chunk ($dailyCard, 3);
    foreach ($dailyCard as $v) {
        $html .= sprintf ($htmlCard, str_replace ("> ", "", $v[2]), str_replace ("> ", "", $v[1]), str_replace ("> ", "", $v[0]));
    }
}

$html = sprintf($htmlMain, $html);

file_put_contents("build/index.html", $html);


// build css
$css = array(
    "css/normalize.css",
    "css/style.css",
);

$cssContent = "/* build time " . date("Y-m-d h:i:s", intval($v)) ." */". PHP_EOL;
foreach ($css as $v) {
    $cssContent .= PHP_EOL . PHP_EOL . "/* build $v */" . PHP_EOL. PHP_EOL;
    $cssContent .= file_get_contents($v);
}
file_put_contents("build/build.css", $cssContent);

// build js
$js = array(
    "dep/jquery.js",
    "js/Drag.js",
    "js/index.js",
);
$jsContent = "/* build time " . date("Y-m-d h:i:s", intval($v)) ." */". PHP_EOL;
foreach($js as $v) {
    $jsContent .= PHP_EOL . PHP_EOL . "/* build $v */". PHP_EOL . PHP_EOL;
    $jsContent .= file_get_contents($v);
}
file_put_contents("build/build.js", $jsContent);
