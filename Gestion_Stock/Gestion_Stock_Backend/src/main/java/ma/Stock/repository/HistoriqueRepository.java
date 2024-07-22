package ma.Stock.repository;

import ma.Stock.entities.Article;
import ma.Stock.entities.Historique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoriqueRepository extends JpaRepository<Historique,Integer> {
    Optional<Historique> findById(Integer id);

    void deleteById(Integer id);
    Historique save(Historique historique);
    List<Historique> findAll();


}
