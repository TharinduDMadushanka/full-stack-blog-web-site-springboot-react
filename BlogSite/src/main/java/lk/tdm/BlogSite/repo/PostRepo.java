package lk.tdm.BlogSite.repo;

import lk.tdm.BlogSite.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface PostRepo extends JpaRepository<Post, Integer> {
}
