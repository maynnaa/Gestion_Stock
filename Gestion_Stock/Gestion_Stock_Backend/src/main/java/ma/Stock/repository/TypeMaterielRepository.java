package ma.Stock.repository;

import ma.Stock.entities.Type_Materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypeMaterielRepository extends JpaRepository<Type_Materiel, Integer> {

    Optional<Type_Materiel> findById(Integer id);

    void deleteById(Integer id);

    Type_Materiel save(Type_Materiel typeMateriel);

    Optional<Type_Materiel> findByLibelle(String libelle);

    List<Type_Materiel> findAll();



}
