package ma.Stock.repository;

import ma.Stock.entities.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer> {

    Optional<Personnel> findById(Integer id);

    void deleteById(Integer id);

    Personnel save(Personnel personnel);

    Optional<Personnel> findByUsername(String username);

    List<Personnel> findAll();
}
