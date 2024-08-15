<?php
 function uploadFile($nameFolder,$file){
     $filename = time().'_'. $file->getClientOriginalName();
     return $file->storeAs($nameFolder,$filename,'public');
 }

