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