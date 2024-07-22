package ma.Stock.repository;

import ma.Stock.entities.Article;
import ma.Stock.entities.Fonction;
import ma.Stock.entities.Type_Materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FonctionRepository extends JpaRepository<Fonction,Integer> {

    Optional<Fonction> findById(Integer id);

    void deleteById(Integer id);
    Optional<Fonction> findByLibelle(String libelle);
    Fonction save(Fonction fonction);
    List<Fonction> findAll();

}
