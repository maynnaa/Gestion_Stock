package ma.Stock.repository;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.entities.FormulaireMateriel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormulaireMaterielRepository extends JpaRepository<FormulaireMateriel,Integer> {
    Optional<FormulaireMateriel> findById(Integer id);
    FormulaireMateriel save(FormulaireMateriel formulaireMateriel);
    List<FormulaireMateriel> findAll();
    void deleteById(Integer id);
    @Query("SELECT fm FROM FormulaireMateriel fm WHERE fm.formulaireBesoins.id_formulaire = :idFormulaireBesoins")
    List<FormulaireMateriel> findArticlesByFormulaireBesoinsId(@Param("idFormulaireBesoins") Integer idFormulaireBesoins);
}