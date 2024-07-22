package ma.Stock.repository;

import ma.Stock.entities.Article;
import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Integer> {
    Optional<Article> findById(Integer id);
    Article save(Article article);
    List<Article> findAll();
    void deleteById(Integer id);

}
