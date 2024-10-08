package ma.Stock.service;

import ma.Stock.entities.Entite;
import ma.Stock.entities.Fonction;
import ma.Stock.entities.Personnel;
import ma.Stock.repository.EntiteRepository;
import ma.Stock.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private EntiteRepository entiteRepository;

    public List<Personnel> findAll() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> findById(int id) {
        return personnelRepository.findById(id);
    }

    public void deleteById(int id) {
        personnelRepository.deleteById(id);
    }

    public Optional<Personnel> findByUsername(String username) {
        return personnelRepository.findByUsername(username);
    }

    public Personnel save(Personnel personnel) {
        return personnelRepository.save(personnel);
    }

    public Optional<Personnel> findEntite(Integer id_entite) {
        return personnelRepository.findByEntiteId(id_entite);
    }


    public Integer getFonctionIdByPersonnelId(int idPersonnel) {
        return personnelRepository.findFonctionIdByPersonnelId(idPersonnel);
    }

    public Fonction getFonctionByPersonnelId(int idPersonnel) {
        return personnelRepository.findFonctionByPersonnelId(idPersonnel);
    }

    public Optional<Personnel> findByEmail(String email) {
        return personnelRepository.findByEmail(email);
    }
}



