package ma.Stock.service;

import ma.Stock.entities.Type_Entite;
import ma.Stock.repository.TypeEntiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeEntiteService {

    @Autowired
    private TypeEntiteRepository typeEntiteRepository;

    public List<Type_Entite> findAll() {
        return typeEntiteRepository.findAll();
    }

    public Optional<Type_Entite> findById(int id) {
        return typeEntiteRepository.findById(id);
    }

    public void deleteById(int id) {
        typeEntiteRepository.deleteById(id);
    }

    public Optional<Type_Entite> findByLibelle(String libelle) {
        return typeEntiteRepository.findByLibelle(libelle);
    }

    public Type_Entite save(Type_Entite typeEntite) {
        return typeEntiteRepository.save(typeEntite);
    }
}
