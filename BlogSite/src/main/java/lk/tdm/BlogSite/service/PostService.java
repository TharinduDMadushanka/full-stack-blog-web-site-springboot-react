package lk.tdm.BlogSite.service;

import lk.tdm.BlogSite.dto.PostDTO;
import lk.tdm.BlogSite.entity.Post;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
public interface PostService {

    Post createPost(PostDTO postDTO, MultipartFile imageFile) throws IOException;

    Post updatePost(int id, PostDTO postDTO, MultipartFile imageFile) throws IOException;

    void deletePost(int id);

    List<Post> getAllPosts();

    Post getPostById(int id);

}
