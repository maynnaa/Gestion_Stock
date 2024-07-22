package ma.Stock.service;

import ma.Stock.entities.Statut_demande;
import ma.Stock.repository.StatutDemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatutDemandeService {

    @Autowired
    private StatutDemandeRepository statutDemandeRepository;

    public List<Statut_demande> findAll() {
        return statutDemandeRepository.findAll();
    }

    public Optional<Statut_demande> findById(int id) {
        return statutDemandeRepository.findById(id);
    }

    public void deleteById(int id) {
        statutDemandeRepository.deleteById(id);
    }

    public Optional<Statut_demande> findByLibelle(String libelle) {
        return statutDemandeRepository.findByLibelle(libelle);
    }

    public Statut_demande save(Statut_demande statutDemande) {
        return statutDemandeRepository.save(statutDemande);
    }
}
