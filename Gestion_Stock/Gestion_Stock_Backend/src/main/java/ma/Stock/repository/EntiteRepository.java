package ma.Stock.repository;

import ma.Stock.entities.Entite;
import ma.Stock.entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntiteRepository extends JpaRepository<Entite, Integer> {

    Optional<Entite> findById(Integer id);

    void deleteById(Integer id);

    Entite save(Entite entite);
    List<Entite> findAll();
    // Méthode pour trouver une entité par son id_entite
    @Query("SELECT e FROM Entite e WHERE e.id_entite = :id_entite")
    Optional<Entite> findByIdEntite(@Param("id_entite") Integer id_entite);

    // Méthode pour trouver une entité par son entite_parent_id
    @Query("SELECT e FROM Entite e WHERE e.id_entite = (SELECT e2.entite_parent_id FROM Entite e2 WHERE e2.id_entite = :id_entite)")
    Optional<Entite> findParentEntite(@Param("id_entite") Integer id_entite);
}