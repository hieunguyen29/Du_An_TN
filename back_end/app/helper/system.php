<?php
 function uploadFile($nameFolder,$file){
     $filename = time().''. $file->getClientOriginalName();
     return $file->storeAS($nameFolder,$filename,'public');
 }

