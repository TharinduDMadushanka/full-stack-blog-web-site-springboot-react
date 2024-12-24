package lk.tdm.BlogSite.entity;

import jakarta.persistence.*;
import lk.tdm.BlogSite.util.PostCategory;

import java.util.Date;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "MEDIUMTEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private PostCategory category;

    @Column(name = "image")
    private String image;

    @Column(name = "publish_date")
    private Date date;


    public Post() {
    }

    public Post(int postId, String title, String content, PostCategory category, String image, Date date) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.image = image;
        this.date = date;
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

    public PostCategory getCategory() {
        return category;
    }

    public void setCategory(PostCategory category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
