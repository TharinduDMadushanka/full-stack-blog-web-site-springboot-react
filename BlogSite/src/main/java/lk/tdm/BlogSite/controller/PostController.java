package lk.tdm.BlogSite.controller;

import lk.tdm.BlogSite.dto.PostDTO;
import lk.tdm.BlogSite.dto.UserDTO;
import lk.tdm.BlogSite.entity.Post;
import lk.tdm.BlogSite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/post")
public class PostController {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Autowired
    private PostService postService;

    @PostMapping(path = "/create-post")
    public ResponseEntity<Post> createPost(
            @ModelAttribute PostDTO postDTO,
            @ModelAttribute UserDTO userDTO,
            @RequestParam("image") MultipartFile image) throws IOException {
        Post createdPost = postService.createPost(postDTO, userDTO, image);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/update-post/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable int id,
            @ModelAttribute PostDTO postDTO,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Post updatedPost = postService.updatePost(id, postDTO, image);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully");
    }

    @GetMapping("/get-all-posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/get-post/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok(resource);
            } else {
                throw new RuntimeException("File not found: " + filename);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while serving file: " + filename, e);
        }
    }

    @GetMapping("/get-posts-by-user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable int userId) {
        List<Post> posts = postService.getPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }

}