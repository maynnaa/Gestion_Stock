package ma.Stock.controller;

import ma.Stock.entities.*;
import ma.Stock.repository.PersonnelRepository;
import ma.Stock.service.*;
import org.hibernate.Hibernate;
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
    private EntiteService entiteService;

    @Autowired
    private PersonnelService personnelService;
    @Autowired
    private PersonnelRepository personnelRepository;
    @Autowired
    private NotificationService notificationService;

    private static final Logger logger = LoggerFactory.getLogger(FormulaireBesoinsController.class);

    @GetMapping("/{id}")
    public ResponseEntity<FormulaireBesoins> getDemandeBesoinById(@PathVariable int id) {
        logger.info("Fetching Demande de besoins with ID: {}", id);
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

            // Sauvegarder le formulaire
            FormulaireBesoins savedFormulaireBesoins = formulaireBesoinsService.save(formulaireBesoins);
            logger.info("FormulaireBesoins created with ID: {}", savedFormulaireBesoins.getPersonnel().getId_personnel());

            // Créer une notification
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
        Integer Idpersonnel = formulaireBesoins.getPersonnel().getId_personnel();
        System.out.println(Idpersonnel);
        Optional<Personnel> personnel = personnelService.findById(Idpersonnel);
        System.out.println(personnel);
        Integer IdEntite=personnel.get().getEntite().getId_entite();
        System.out.println(IdEntite);
        Integer entite=entiteService.getParentEntite(IdEntite);
        System.out.println("id pareneeeeeeet "+entite);
        Optional<Personnel> personnelfinal = personnelService.findEntite(entite);
        Personnel personnelfinall = personnelfinal.get();
        System.out.println(personnelfinal);
        notification.setPersonnel(personnelfinall);
        Integer idfct=personnel.get().getFonction().getId_fonction();
        if(idfct==2) formulaireBesoins.setValidation("Premiere validation");
        else if (idfct==3) {formulaireBesoins.setValidation("en cours");

        }
        notificationService.save(notification);
    }







}
