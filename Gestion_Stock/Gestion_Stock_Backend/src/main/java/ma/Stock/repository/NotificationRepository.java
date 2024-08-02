package ma.Stock.repository;

import ma.Stock.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    Optional<Notification> findById(Integer id);

    void deleteById(Integer id);
    Notification save(Notification notification);
    List<Notification> findAll();
}
