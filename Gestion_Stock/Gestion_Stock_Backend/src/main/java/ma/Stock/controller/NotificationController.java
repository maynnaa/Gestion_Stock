package ma.Stock.controller;

import ma.Stock.entities.Notification;
import ma.Stock.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "http://localhost:3000")

public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.findAll();
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable("id") int id) {
        Optional<Notification> notificationOptional = notificationService.findById(id);
        return notificationOptional
                .map(notification -> new ResponseEntity<>(notification, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        try {
            // Validation de l'objet Notification reçu
            if (notification.getFormulaireBesoins() == null || notification.getPersonnel() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Notification createdNotification = notificationService.save(notification);
            System.out.println(createdNotification);
            return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // Imprime la pile d'erreurs pour faciliter le débogage
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable("id") int id, @RequestBody Notification updatedNotification) {
        Notification updated = notificationService.save(updatedNotification);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable("id") int id) {
        notificationService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
