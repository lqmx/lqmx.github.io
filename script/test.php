<?php


class Status {
    static $kw = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/";
}


$html = <<<HTML
1212
<p title="1<p'>2" id='1<3>"222'>lmx</p>
<img src="src" alt="alt">
<div><span>j"<.<span>smx</span>mx</span>qm>x<em><em><span class="em"></span>.</em>bmx</em></div>121212
HTML;


$html = str_replace("\r\n", "", $html);
$len = strlen($html);
$index = 0;
$sTag = array(
    'area', 'base', 'br', 'col',
    'command', 'embed', 'hr', 'img',
    'input', 'keygen', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
);

$stack = array();
$data = array();
$text = '';
function iStack($stack, $item) {
    $stack[] = &$item;
    return $stack;
}

function oStack($stack) {
    global $data, $text;
    $item = $stack[count($stack)-1];
    unset($stack[count($stack)-1]);
    if(empty($stack)) {
        $data[] = $item;
    } else {
        $stack[count($stack)-1]['child'][] = $item;
    }
    return $stack;
}

while (true) {

    $iL = findL($html, $len, $index);
//    echo $iL, " ";
    $text .= substr($html, $index, $iL-$index);
    if($iL == -1) {
        break;
    }
    $iR = findR($html, $len, $iL);
    $div = substr($html, $iL, $iR-$iL+1);
    $iBlank =strpos($div, ' ') ;
    if($iBlank === false) {
        $name = substr($div, 1, strlen($div)-2);
        if($name[0]!='/') {
            if(count($stack) > 0 and in_array($stack[count($stack)-1]['name'], $sTag)) {
                $stack = oStack($stack);
            }
            $stack = iStack($stack, array(
                'name' => $name,
                'child' => array(),
            ));
        }
        else {
            if(count($stack) > 0 and substr($name, 1) == $stack[count($stack)-1]['name']){
                $stack = oStack($stack);
            }
        }
    }
    else {
        $name = substr($div, 1, $iBlank-1);
        $attr = substr($div, $iBlank, strlen($div)-$iBlank-1);
        $attr = mkAttr($attr);
        $stack = iStack($stack, array(
            'name' => $name,
            'child' => array(),
            'attr' => $attr,
        ));
    }
    $index = $iR+1;
    $stack = array_values($stack);
//    echo " ", json_encode($stack), ' ';
    echo PHP_EOL;
}


echo PHP_EOL, json_encode($data), PHP_EOL;

function mkAttr($str) {
    $attr = array();
    foreach(explode(' ', $str) as $v) {
        if(empty($v)) continue;
        $index = strpos($v, '=');
        $kk = substr($v, 0, strpos($v, '='));
        $vv = substr($v, $index+2, strlen($v)-strlen($kk)-3);
        $attr[$kk] = $vv;
    }
    return $attr;
}

function findL($str, $len, $index) {
    while($index<$len) {
        $ch = $str[$index];
        if($ch == '<' and strpos(Status::$kw, $str[$index+1]) !== false) return $index;
        $index ++;
    }
    return -1;
}

function findR($str, $len, $index) {
    $quote = array('"', "'");
    $curQuote = '';
    while ($index<$len) {
        $ch = $str[$index];
        if(in_array($ch, $quote)) {
            if($curQuote == '') {
                $curQuote = $ch;
            }elseif($curQuote == $ch) {
                $curQuote = '';
            }
        }
        if($ch == '>' and $curQuote ==  '') return $index;
        $index ++;
    }
    return -1;
}