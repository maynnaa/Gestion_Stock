package ma.Stock.service;

import ma.Stock.entities.Historique;
import ma.Stock.repository.HistoriqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoriqueService {

    @Autowired
    private HistoriqueRepository historiqueRepository;

    public List<Historique> findAll() {
        return historiqueRepository.findAll();
    }

    public Optional<Historique> findById(int id) {
        return historiqueRepository.findById(id);
    }

    public void deleteById(int id) {
        historiqueRepository.deleteById(id);
    }

    public Historique save(Historique historique) {
        return historiqueRepository.save(historique);
    }
}
