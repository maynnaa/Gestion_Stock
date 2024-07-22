package ma.Stock.repository;

import ma.Stock.entities.Statut_demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatutDemandeRepository extends JpaRepository<Statut_demande, Integer> {

    Optional<Statut_demande> findById(Integer id);

    void deleteById(Integer id);

    Statut_demande save(Statut_demande statutDemande);

    Optional<Statut_demande> findByLibelle(String libelle);

    List<Statut_demande> findAll();
}
