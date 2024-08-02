package ma.Stock.repository;

import ma.Stock.entities.Fonction;
import ma.Stock.entities.Materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterielRepository extends JpaRepository<Materiel,Integer> {
    Optional<Materiel> findById(Integer id);

    void deleteById(Integer id);
    Optional<Materiel> findByLibelle(String nom);
    Materiel save(Materiel materiel);
    List<Materiel> findAll();
}
