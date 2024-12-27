package lk.tdm.BlogSite.dto;

import lk.tdm.BlogSite.util.PostCategory;

import java.util.Date;

public class PostDTO {

    private int postId;
    private String title;
    private String content;
    private String category;
    private Date date;
    private int userId;

    public PostDTO() {
    }

    public PostDTO(int postId, String title, String content, String category,Date date) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.date = date;
    }

    public PostDTO(int postId, String title, String content, String category, Date date, int userId) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.date = date;
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}