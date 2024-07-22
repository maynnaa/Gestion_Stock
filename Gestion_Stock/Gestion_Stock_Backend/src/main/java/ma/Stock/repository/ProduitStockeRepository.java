package ma.Stock.repository;

import ma.Stock.entities.Produit_Stocke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProduitStockeRepository extends JpaRepository<Produit_Stocke, Integer> {

    Optional<Produit_Stocke> findById(Integer id);

    void deleteById(Integer id);

    Produit_Stocke save(Produit_Stocke produitStocke);

    Optional<Produit_Stocke> findByNom(String nom);
    List<Produit_Stocke> findAll();
}
