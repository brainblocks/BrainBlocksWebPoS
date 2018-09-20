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

function languages_to_array( $languages ) {
  $return = array();
  foreach( $languages as $language => $priority ) {
    $return.push($language);
  }
  return $return;
}

$locale_data = array();

// Get language from http header ===
$languages = array( 'unknown' => 1 );
if( isset( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ) ) {
  $languages = get_languages_from_http( $_SERVER['HTTP_ACCEPT_LANGUAGE'] );
  $languages_arr = languages_to_array( $languages );
  echo $languages_arr;
}

// debugging locally
//$languages = get_languages_from_http( 'fr;q=0.8,en-US,en;q=0.9' );

$locale_data['accept_languages'] = $languages;

// Get country from Cloudflare header ===
$country = isset( $_SERVER["HTTP_CF_IPCOUNTRY"] ) ? $_SERVER["HTTP_CF_IPCOUNTRY"] : null;

// debug locally
//$country = 'AU';

if( $country ) {
  $locale_data['country_code'] = $country;
}

// Read index.html into memory and replace vals ===
$file = 'index.html';
if( file_exists( $file ) ) {
  $index = file_get_contents( $file );
  $index = str_replace( '__LOCALE_DATA__', json_encode( $locale_data ), $index );
}

echo $index;