<?php
$filePath = "sprinter.json";
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
$rest = 'rest_'.strtolower($_SERVER['REQUEST_METHOD']);


function logging($message) {
  if (TRUE) error_log($message);
}

/**
 * reroute the request to the specific handler
 */
if (function_exists($rest)) {
  call_user_func($rest, $request);
} else {
  responseWithError("method not allowed");
}

function responseWithError($text) {
  header("HTTP/1.1 500 Internal Server Error");
  header("Access-Control-Allow-Origin: *");

  echo $text;
  logging('failed handling request');
  die;
}

function responseWithOK($text) {
  header("HTTP/1.1 200 OK");
  header("Access-Control-Allow-Origin: *");

  echo $text;
}

////////////////////////////////////////////////////////////
//                    request handlers                    //
////////////////////////////////////////////////////////////


function rest_options($request) {
  header("HTTP/1.1 200 OK");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Access-Control-Allow-Methods","POST, GET, OPTIONS");

  echo "Allow: POST, GET, OPTIONS";
  logging('handled options request.');
}

/**
 * returns the current data
 */
function rest_get($request) {
  global $filePath;
  $data = file_get_contents($filePath);
  if ($data) {
    header("HTTP/1.1 200 OK");
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');

    echo $data;

    logging("handled get request. Sent ".strlen($data)." chars");

  } else {
    responseWithError("couldn't open ".$filePath);
  }
}

/**
 * handles the save request
 */
function rest_post($request) {
  header("HTTP/1.1 200 OK");
  header("Access-Control-Allow-Origin: *");
  header('Content-Type: application/json');

  global $filePath;
  $string = file_get_contents('php://input');

  $file_handle = fopen($filePath, 'w');
  if ($file_handle) {
    fwrite($file_handle, $string);
    fclose($file_handle);
    responseWithOK('wrote '.strlen($string).' chars');

    logging('handled post request. Wrote '.strlen($string).' chars');
  } else {
    responseWithError("couldn't write ".$filePath);
  }
}
