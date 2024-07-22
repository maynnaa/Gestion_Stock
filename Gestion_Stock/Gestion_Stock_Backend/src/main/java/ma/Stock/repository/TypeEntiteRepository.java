package ma.Stock.repository;

import ma.Stock.entities.Type_Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypeEntiteRepository extends JpaRepository<Type_Entite, Integer> {

    Optional<Type_Entite> findById(Integer id);

    void deleteById(Integer id);

    Type_Entite save(Type_Entite typeEntite);

    Optional<Type_Entite> findByLibelle(String libelle);

    List<Type_Entite> findAll();
}
