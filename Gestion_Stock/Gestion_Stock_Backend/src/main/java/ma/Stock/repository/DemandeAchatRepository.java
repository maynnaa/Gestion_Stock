package ma.Stock.repository;

import ma.Stock.entities.Article;
import ma.Stock.entities.DemandeAchat;
import ma.Stock.entities.DemandeAchat;
import ma.Stock.entities.Entite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DemandeAchatRepository extends JpaRepository<DemandeAchat,Integer> {
    Optional<DemandeAchat> findById(Integer id);
    DemandeAchat save(DemandeAchat demande);
    List<DemandeAchat> findAll();
    void deleteById(Integer id);

}
