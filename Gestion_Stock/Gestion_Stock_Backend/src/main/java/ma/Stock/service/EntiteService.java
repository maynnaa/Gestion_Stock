package ma.Stock.service;

import ma.Stock.entities.Entite;
import ma.Stock.repository.EntiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntiteService {

    private final EntiteRepository entiteRepository;

    @Autowired
    public EntiteService(EntiteRepository entiteRepository) {
        this.entiteRepository = entiteRepository;
    }

    public List<Entite> findAll() {
        return entiteRepository.findAll();
    }

    public Optional<Entite> findById(int id) {
        return entiteRepository.findById(id);
    }

    public void deleteById(int id) {
        entiteRepository.deleteById(id);
    }

    public Entite save(Entite entite) {
        return entiteRepository.save(entite);
    }
    public Entite getParentEntite(Integer id_entite) {
        // Trouver l'entité actuelle
        Optional<Entite> currentEntiteOpt = entiteRepository.findByIdEntite(id_entite);

        if (currentEntiteOpt.isPresent()) {
            Entite currentEntite = currentEntiteOpt.get();
            // Forcer le chargement de l'entité parent
            Integer parentId = currentEntite.getEntite_parent_id();
            return entiteRepository.findByIdEntite(parentId).orElse(null);
        }

        return null;
    }



}
