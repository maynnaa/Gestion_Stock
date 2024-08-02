package ma.Stock.repository;

import ma.Stock.entities.ArticleAffecte;
import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleAffecteRepository extends JpaRepository<ArticleAffecte,Integer> {
    Optional<ArticleAffecte> findById(Integer id);
    ArticleAffecte save(ArticleAffecte article);
    List<ArticleAffecte> findAll();
    void deleteById(Integer id);

}
