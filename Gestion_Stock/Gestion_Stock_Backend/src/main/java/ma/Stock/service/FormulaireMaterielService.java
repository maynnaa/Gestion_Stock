package ma.Stock.service;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.entities.FormulaireMateriel;
import ma.Stock.entities.Personnel;
import ma.Stock.repository.FormulaireBesoinsRepository;
import ma.Stock.repository.FormulaireMaterielRepository;
import ma.Stock.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormulaireMaterielService {

    @Autowired
    private FormulaireMaterielRepository formulaireMaterielRepository;



    public List<FormulaireMateriel> findAll() {
        return formulaireMaterielRepository.findAll();
    }

    public Optional<FormulaireMateriel> findById(int id) {
        return formulaireMaterielRepository.findById(id);
    }

    public void deleteById(int id) {
        formulaireMaterielRepository.deleteById(id);
    }

    public FormulaireMateriel save(FormulaireMateriel formulaireMateriel) {
        return formulaireMaterielRepository.save(formulaireMateriel);
    }
    public List<FormulaireMateriel> getArticlesByFormulaireBesoinsId(Integer idFormulaireBesoins) {
        return formulaireMaterielRepository.findArticlesByFormulaireBesoinsId(idFormulaireBesoins);
    }

}
