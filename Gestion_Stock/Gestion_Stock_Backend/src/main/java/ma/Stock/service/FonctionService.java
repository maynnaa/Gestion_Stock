package ma.Stock.service;

import ma.Stock.entities.Fonction;
import ma.Stock.repository.FonctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FonctionService {

    @Autowired
    private FonctionRepository fonctionRepository;

    public List<Fonction> findAll() {
        return fonctionRepository.findAll();
    }

    public Optional<Fonction> findById(int id) {
        return fonctionRepository.findById(id);
    }

    public void deleteById(int id) {
        fonctionRepository.deleteById(id);
    }

    public Optional<Fonction> findByLibelle(String libelle) {
        return fonctionRepository.findByLibelle(libelle);
    }

    public Fonction save(Fonction fonction) {
        return fonctionRepository.save(fonction);
    }
}
