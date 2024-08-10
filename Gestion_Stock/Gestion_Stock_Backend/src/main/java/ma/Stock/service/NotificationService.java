package ma.Stock.service;

import ma.Stock.entities.Entite;
import ma.Stock.entities.Notification;
import ma.Stock.entities.Personnel;
import ma.Stock.repository.EntiteRepository;
import ma.Stock.repository.NotificationRepository;
import ma.Stock.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private EntiteRepository entiteRepository;
    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> findById(int id) {
        return notificationRepository.findById(id);
    }

    public void deleteById(int id) {
        notificationRepository.deleteById(id);
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

}
