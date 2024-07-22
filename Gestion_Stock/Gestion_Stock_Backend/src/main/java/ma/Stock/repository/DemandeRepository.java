package ma.Stock.repository;

import ma.Stock.entities.Article;
import ma.Stock.entities.Demande;
import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DemandeRepository extends JpaRepository<Demande,Integer> {
    Optional<Demande> findById(Integer id);
    Demande save(Demande demande);
    List<Demande> findAll();
    void deleteById(Integer id);

}
