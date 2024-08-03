package ma.Stock.service;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.entities.Fournisseur;
import ma.Stock.repository.FormulaireBesoinsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormulaireBesoinsService {

    @Autowired
    private FormulaireBesoinsRepository formulaireBesoinsRepository;

    public List<FormulaireBesoins> findAll() {
        return formulaireBesoinsRepository.findAll();
    }

    public Optional<FormulaireBesoins> findById(int id) {
        return formulaireBesoinsRepository.findById(id);
    }

    public void deleteById(int id) {
        formulaireBesoinsRepository.deleteById(id);
    }

    public FormulaireBesoins save(FormulaireBesoins formulaireBesoins) {
        return formulaireBesoinsRepository.save(formulaireBesoins);
    }

}