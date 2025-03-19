package lk.tdm.BlogSite.repo;

import lk.tdm.BlogSite.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepo extends JpaRepository<Post, Integer> {
    @Query("SELECT p FROM Post p WHERE p.user.userId = :userId")
    List<Post> findByUserId(@Param("userId") int userId);
}
