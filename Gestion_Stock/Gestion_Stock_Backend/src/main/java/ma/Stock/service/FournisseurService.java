package ma.Stock.service;

import ma.Stock.entities.Fournisseur;
import ma.Stock.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    public List<Fournisseur> findAll() {
        return fournisseurRepository.findAll();
    }

    public Optional<Fournisseur> findById(int id) {
        return fournisseurRepository.findById(id);
    }

    public void deleteById(int id) {
        fournisseurRepository.deleteById(id);
    }

    public Optional<Fournisseur> findByCIN(String cin) {
        return fournisseurRepository.findByCin(cin);
    }

    public Fournisseur save(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    public Optional<Fournisseur> findByNom(String nom) {
        return fournisseurRepository.findByNom(nom);
    }
}
