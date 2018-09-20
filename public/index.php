<?php

function get_languages_from_http( $lang_header ) {
  $prefLocales = array_reduce(
    explode(',', $lang_header), 
    function ($res, $el) { 
      list($l, $q) = array_merge(explode(';q=', $el), [1]); 
      $res[$l] = (float) $q; 
      return $res; 
    }, []);
  arsort($prefLocales);
  return $prefLocales;
}

// Get language from http header ===
$languages = array( 'unknown' => 1 );
if( isset( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ) ) {
  $languages = get_languages_from_http( $_SERVER['HTTP_ACCEPT_LANGUAGE'] );
}
// debugging locally
//$languages = get_languages_from_http( 'fr;q=0.8,en-US,en;q=0.9' );

reset($languages);
$lang = key($languages);

// Get country from Cloudflare header ===
$country = isset( $_SERVER["HTTP_CF_IPCOUNTRY"] ) ? $_SERVER["HTTP_CF_IPCOUNTRY"] : null;
$country_json = '';

// debug locally
//$country = 'AU';

if( $country ) {
  $country_arr = array( 'country_code' => $country );
  $country_json = json_encode( $country_arr );
}

// Read index.html into memory and replace vals
$file = 'index.html';
if( file_exists( $file ) ) {
  $index = file_get_contents( $file );
  $index = str_replace( '__LANGUAGE__', $lang, $index );
  $index = str_replace( '__COUNTRY_DATA__', $country_json, $index );
}

echo $index;