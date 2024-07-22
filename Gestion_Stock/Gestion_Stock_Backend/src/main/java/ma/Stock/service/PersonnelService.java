package ma.Stock.service;

import ma.Stock.entities.Personnel;
import ma.Stock.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;

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
}
