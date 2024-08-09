package ma.Stock.controller;

import ma.Stock.entities.DemandeAchat;
import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.entities.Notification;
import ma.Stock.service.FormulaireBesoinsService;
import ma.Stock.service.MaterielService;
import ma.Stock.service.NotificationService;
import ma.Stock.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/formulaireBesoins")
public class FormulaireBesoinsController {

    @Autowired
    private FormulaireBesoinsService formulaireBesoinsService;

    @Autowired
    private MaterielService materielService;

    @Autowired
    private PersonnelService personnelService;

    @Autowired
    private NotificationService notificationService;

    private static final Logger logger = LoggerFactory.getLogger(FormulaireBesoinsController.class);

    @GetMapping("/{id}")
    public ResponseEntity<FormulaireBesoins> getDemandeBesoinById(@PathVariable int id) {
        System.out.println("Fetching Demande de besoins with ID: " + id);
        Optional<FormulaireBesoins> demandeBesoins = formulaireBesoinsService.findById(id);
        return demandeBesoins.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<FormulaireBesoins>> getAllFormulaireBesoins() {
        List<FormulaireBesoins> allDemandes = formulaireBesoinsService.findAll();
        return ResponseEntity.ok(allDemandes);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FormulaireBesoins>> getFormulaireBesoinsByUserId(@PathVariable int userId) {
        List<FormulaireBesoins> demandes = formulaireBesoinsService.findByPersonnelId(userId);
        if (demandes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(demandes);
    }

    @PostMapping
    public ResponseEntity<FormulaireBesoins> createFormulaireBesoins(@RequestBody FormulaireBesoins formulaireBesoins) {
        try {
            if (formulaireBesoins.getPersonnel() == null) {
                logger.error("Personnel is null in FormulaireBesoins");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            int idPersonnel = formulaireBesoins.getPersonnel().getId_personnel();
            logger.info("Received id_personnel: {}", idPersonnel);

            formulaireBesoins.getFormulaireMateriels().forEach(materiel -> {
                materiel.setFormulaireBesoins(formulaireBesoins);
                materiel.setMateriel(materielService.findById(materiel.getMateriel().getId_materiel())
                        .orElseThrow(() -> new RuntimeException("Materiel not found")));
                materiel.setPersonnel(personnelService.findById(materiel.getPersonnel().getId_personnel())
                        .orElseThrow(() -> new RuntimeException("Personnel not found")));
            });

            FormulaireBesoins savedFormulaireBesoins = formulaireBesoinsService.save(formulaireBesoins);
            logger.info("FormulaireBesoins created with ID: {}", savedFormulaireBesoins.getPersonnel().getId_personnel());
            createNotification(savedFormulaireBesoins);

            return ResponseEntity.ok(savedFormulaireBesoins);
        } catch (Exception e) {
            logger.error("Error creating FormulaireBesoins", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    private void createNotification(FormulaireBesoins formulaireBesoins) {
        Notification notification = new Notification();
        notification.setFormulaireBesoins(formulaireBesoins);
        notification.setPersonnel(formulaireBesoins.getPersonnel()); // Associer le personnel
        // Les valeurs par défaut sont déjà définies dans l'entité

        notificationService.save(notification);
    }

}
