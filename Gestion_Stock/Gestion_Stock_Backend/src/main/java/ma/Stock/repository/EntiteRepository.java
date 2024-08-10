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

    @Query("SELECT e.entite_parent_id FROM Entite e WHERE e.id_entite = :idEntite")
    Integer findParentIdByIdEntite(@Param("idEntite") Integer idEntite);
}