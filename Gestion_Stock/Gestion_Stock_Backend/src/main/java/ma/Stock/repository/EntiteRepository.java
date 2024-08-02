package ma.Stock.repository;

import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntiteRepository extends JpaRepository<Entite, Integer> {

    Optional<Entite> findById(Integer id);

    void deleteById(Integer id);

    Entite save(Entite entite);
    List<Entite> findAll();
}