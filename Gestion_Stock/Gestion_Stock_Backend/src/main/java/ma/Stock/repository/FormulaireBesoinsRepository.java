package ma.Stock.repository;

import ma.Stock.entities.*;
import ma.Stock.entities.DemandeAchat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormulaireBesoinsRepository extends JpaRepository<FormulaireBesoins,Integer> {
    Optional<FormulaireBesoins> findById(Integer id);
    FormulaireBesoins save(FormulaireBesoins formulaireBesoins);
    List<FormulaireBesoins> findAll();
    void deleteById(Integer id);

}
