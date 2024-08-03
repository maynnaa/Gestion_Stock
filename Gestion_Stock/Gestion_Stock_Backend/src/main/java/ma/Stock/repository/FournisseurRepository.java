package ma.Stock.repository;

import ma.Stock.entities.Entite;
import ma.Stock.entities.Fonction;
import ma.Stock.entities.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur,Integer> {

    Optional<Fournisseur> findById(Integer id);

    void deleteById(Integer id);
    Optional<Fournisseur> findByCin(String cin);
    Fournisseur save(Fournisseur fournisseur);
    List<Fournisseur> findAll();

    Optional<Fournisseur> findByNom(String nom);



}
