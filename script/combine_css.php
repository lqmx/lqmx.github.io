<?php

$config = parse_ini_file("./config.ini");

$files = glob($config['module_dir']."*/*.css");

$output = $config['module_combine_css_dir'] . "module.css";
file_put_contents($output, "");
foreach ($files as $file) {
    $filename = basename($file, '.css');
    $content = file_get_contents($file);
    $content = "/* $filename */" . PHP_EOL . $content . PHP_EOL;
    file_put_contents($output, $content, FILE_APPEND);
    $cmd = "cp " . dirname($file) . "/*.cur " . $config['module_combine_css_dir'];
    shell_exec($cmd);
}
