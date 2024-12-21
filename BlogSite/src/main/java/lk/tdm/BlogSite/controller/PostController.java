package lk.tdm.BlogSite.controller;

import lk.tdm.BlogSite.dto.PostDTO;
import lk.tdm.BlogSite.entity.Post;
import lk.tdm.BlogSite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("api/v1/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(path = "/create-post")
    public ResponseEntity<Post> createPost(
            @ModelAttribute PostDTO postDTO,
            @RequestParam("image") MultipartFile image) throws IOException {
        Post createdPost = postService.createPost(postDTO, image);
        return ResponseEntity.ok(createdPost);
    }

}