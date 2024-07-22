package ma.Stock.service;

import ma.Stock.entities.Materiel;
import ma.Stock.repository.MaterielRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterielService {

    @Autowired
    private MaterielRepository materielRepository;

    public List<Materiel> findAll() {
        return materielRepository.findAll();
    }

    public Optional<Materiel> findById(int id) {
        return materielRepository.findById(id);
    }

    public void deleteById(int id) {
        materielRepository.deleteById(id);
    }

    public Optional<Materiel> findByNom(String libelle) {
        return materielRepository.findByLibelle(libelle);
    }

    public Materiel save(Materiel materiel) {
        return materielRepository.save(materiel);
    }
}
