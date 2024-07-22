package ma.Stock.service;

import ma.Stock.entities.Type_Materiel;
import ma.Stock.repository.TypeMaterielRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeMaterielService {

    @Autowired
    private TypeMaterielRepository typeMaterielRepository;

    public List<Type_Materiel> findAll() {
        return typeMaterielRepository.findAll();
    }

    public Optional<Type_Materiel> findById(int id) {
        return typeMaterielRepository.findById(id);
    }

    public void deleteById(int id) {
        typeMaterielRepository.deleteById(id);
    }

    public Optional<Type_Materiel> findByLibelle(String libelle) {
        return typeMaterielRepository.findByLibelle(libelle);
    }

    public Type_Materiel save(Type_Materiel typeMateriel) {
        return typeMaterielRepository.save(typeMateriel);
    }
}
