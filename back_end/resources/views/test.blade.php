<form action="/" method="post" enctype="multipart/form-data">
    @csrf
   
    <div class="form-group">
        <label class="col-md-3 col-sm-4 control-label">Image</label>
        <div class="col-md-9 col-sm-8">
            <div class="row">
                <div class="col-xs-6">
                    <img id="anh_the_preview" src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg" alt="your image"
                         style="max-width: 200px; height:100px; margin-bottom: 10px;" class="img-fluid"/>
                    <input type="file" name="hinh" accept="image/*"
                           class="form-control-file @error('image') is-invalid @enderror" id="cmt_anh">
                   
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-success" type="submit">Save</button>
   
</form>