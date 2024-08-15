type Props = {};
import React from 'react';
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import './post.css'
function AddCategoryForm() {
    return (
        // <div id="col-left">
        //     <div className="col-wrap">
        //         <div className="form-wrap">
        //             <h2>Thêm chuyên mục</h2>
        //             <form id="addtag" method="post" action="edit-tags.php" className="validate">
        //                 <input type="hidden" name="action" value="add-tag" />
        //                 <input type="hidden" name="screen" value="edit-category" />
        //                 <input type="hidden" name="taxonomy" value="category" />
        //                 <input type="hidden" name="post_type" value="post" />
        //                 <input type="hidden" id="_wpnonce_add-tag" name="_wpnonce_add-tag" value="174d8ed91f" />
        //                 <input type="hidden" name="_wp_http_referer" value="/wordpress/wp-admin/edit-tags.php?taxonomy=category" />
        //                 <div className="form-field form-required term-name-wrap">
        //                     <label htmlFor="tag-name">Tên</label>
        //                     <input name="tag-name" id="tag-name" type="text" value="" size="40" aria-required="true" aria-describedby="name-description" />

        //                 </div>
        //                 <div className="form-field term-slug-wrap">
        //                     <label htmlFor="tag-slug">Đường dẫn</label>
        //                     <input name="slug" id="tag-slug" type="text" value="" size="40" aria-describedby="slug-description" />

        //                 </div>
        //                 <div className="form-field term-parent-wrap">
        //                     <label htmlFor="parent">Chuyên mục cha</label>
        //                     <select name="parent" id="parent" className="postform" aria-describedby="parent-description">
        //                         <option value="-1">Trống</option>
        //                         <option value="5">333</option>
        //                         <option value="4">13</option>
        //                         <option className="level-0" value="1">Chưa phân loại</option>
        //                     </select>

        //                 </div>
        //                 <div className="form-field term-description-wrap">
        //                     <label htmlFor="tag-description">Mô tả</label>
        //                     <textarea name="description" id="tag-description" rows="5" cols="40" aria-describedby="description-description"></textarea>

        //                 </div>

        //                 <p className="submit">
        //                     <input type="submit" name="submit" id="submit" className="button button-primary" value="Thêm chuyên mục" /> <span className="spinner"></span>
        //                 </p>
        //             </form>
        //         </div>
        //     </div>
        // </div>
        <div id="col-right">
            <div className="col-wrap">
                <form id="posts-filter" method="post">
                    <input type="hidden" name="taxonomy" value="category" />
                    <input type="hidden" name="post_type" value="post" />
                    <input type="hidden" id="_wpnonce" name="_wpnonce" value="66afa5959a" />
                    <input type="hidden" name="_wp_http_referer" value="/wordpress/wp-admin/edit-tags.php?taxonomy=category" />
                    <div className="tablenav top">
                        <div className="alignleft actions bulkactions">
                            <label htmlFor="bulk-action-selector-top" className="screen-reader-text">Lựa chọn thao tác hàng loạt</label>
                            <select name="action" id="bulk-action-selector-top">
                                <option value="-1">Hành động</option>
                                <option value="delete">Xóa</option>
                            </select>
                            <input type="submit" id="doaction" className="button action" value="Áp dụng" />
                        </div>
                        <div className="tablenav-pages one-page">
                            <span className="displaying-num">1 mục</span>
                            <span className="pagination-links">
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">«</span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">‹</span>
                                <span className="paging-input">
                                    <label htmlFor="current-page-selector" className="screen-reader-text">Trang hiện tại</label>
                                    <input className="current-page" id="current-page-selector" type="text" name="paged" value="1" size="1" aria-describedby="table-paging" />
                                    <span className="tablenav-paging-text"> trên <span className="total-pages">1</span></span>
                                </span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">›</span>
                                <span className="tablenav-pages-navspan button disabled" aria-hidden="true">»</span>
                            </span>
                        </div>
                        <br className="clear" />
                    </div>
                    <h2 className="screen-reader-text">Danh sách chuyên mục</h2>
                    <table className="wp-list-table widefat fixed striped table-view-list tags">
                        {/* Nội dung bảng, các hàng và cột */}
                    </table>
                    <div className="tablenav bottom">
                        <div className="alignleft actions bulkactions">
                            {/* Phần dưới cùng của bảng */}
                        </div>
                        <div className="tablenav-pages one-page">
                            {/* Phần phân trang dưới cùng của bảng */}
                        </div>
                        <br className="clear" />
                    </div>
                </form>
                <div className="form-wrap edit-term-notes">
                    <p>
                        Xóa chuyên mục sẽ không xóa bài viết trong chuyên mục đó. Thay vì thế, bài viết sẽ được chuyển đến chuyên mục mặc định <strong>Chưa phân loại</strong>. Chuyên mục mặc định không thể xóa.
                    </p>
                    <p>
                        Nhóm phân loại có thể được lựa chọn chuyển đổi thành thẻ đánh dấu với <a href="http://localhost/wordpress/wp-admin/import.php">công cụ chuyển đổi nhóm phân loại và thẻ đánh dấu</a>.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default AddCategoryForm;