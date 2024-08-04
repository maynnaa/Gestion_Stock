package ma.Stock.repository;

import ma.Stock.entities.ArticleDemande;
import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleDemande,Integer> {
    Optional<ArticleDemande> findById(Integer id);
    ArticleDemande save(ArticleDemande article);
    List<ArticleDemande> findAll();
    void deleteById(Integer id);



}
