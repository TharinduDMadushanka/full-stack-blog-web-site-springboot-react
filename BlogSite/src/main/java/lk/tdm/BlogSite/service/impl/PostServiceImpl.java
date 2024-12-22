package lk.tdm.BlogSite.service.impl;

import lk.tdm.BlogSite.dto.PostDTO;
import lk.tdm.BlogSite.entity.Post;
import lk.tdm.BlogSite.repo.PostRepo;
import lk.tdm.BlogSite.service.PostService;
import lk.tdm.BlogSite.util.PostCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;


@Service
public class PostServiceImpl implements PostService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Autowired
    private PostRepo postRepo;

    @Override
    public Post createPost(PostDTO postDTO, MultipartFile imageFile) throws IOException {
        PostCategory postCategory;
        try {
            postCategory = PostCategory.valueOf(postDTO.getCategory().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid category value: " + postDTO.getCategory());
        }

        String imageName = saveImage(imageFile);

        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setCategory(postCategory);
        post.setImage(imageName);
        post.setDate(new Date());

        return postRepo.save(post);
    }

    @Override
    public Post updatePost(int id, PostDTO postDTO, MultipartFile imageFile) throws IOException {
        Post existingPost = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        if (postDTO.getTitle() != null) existingPost.setTitle(postDTO.getTitle());
        if (postDTO.getContent() != null) existingPost.setContent(postDTO.getContent());
        if (postDTO.getCategory() != null) {
            PostCategory category = PostCategory.valueOf(postDTO.getCategory().toUpperCase());
            existingPost.setCategory(category);
        }
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = saveImage(imageFile);
            existingPost.setImage(imageName);
        }

        return postRepo.save(existingPost);
    }

    @Override
    public void deletePost(int id) {
        Post post = postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepo.delete(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post getPostById(int id) {
        return postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // Helper method to save image
    private String saveImage(MultipartFile imageFile) throws IOException {
        String fileName = imageFile.getOriginalFilename();

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

}