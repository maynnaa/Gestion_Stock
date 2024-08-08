package ma.Stock.controller;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.entities.FormulaireMateriel;
import ma.Stock.entities.Materiel;
import ma.Stock.entities.Personnel;
import ma.Stock.service.FormulaireBesoinsService;
import ma.Stock.service.FormulaireMaterielService;
import ma.Stock.service.MaterielService;
import ma.Stock.service.PersonnelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/formulaireMateriel")
public class FormulaireMaterielController {

    private static final Logger logger = LoggerFactory.getLogger(FormulaireMaterielController.class);

    @Autowired
    private FormulaireMaterielService formulaireMaterielService;

    @Autowired
    private FormulaireBesoinsService formulaireBesoinsService;

    @Autowired
    private MaterielService materielService;

    @Autowired
    private PersonnelService personnelService;

    @PostMapping
    public ResponseEntity<?> createFormulaireMateriel(@RequestBody Map<String, Object> payload) {
        try {
            logger.info("Données reçues: " + payload);

            // Validate payload and extract data with null checks
            if (payload == null) {
                return ResponseEntity.badRequest().body("Payload cannot be null");
            }

            Integer formulaireId = getIntegerFromPayload(payload, "formulaireBesoins");
            Integer materielId = getIntegerFromPayload(payload, "materiel");
            Integer quantity = getIntegerFromPayload(payload, "quantite");
            Integer personnelId = getIntegerFromPayload(payload, "id_personnel");
            System.out.println(personnelId);

            if (formulaireId == null || materielId == null || quantity == null || personnelId == null) {
                return ResponseEntity.badRequest().body("One or more required fields are missing");
            }

            // Fetch entities
            Optional<FormulaireBesoins> formulaireBesoinsOptional = formulaireBesoinsService.findById(formulaireId);
            if (!formulaireBesoinsOptional.isPresent()) {
                logger.error("Formulaire de besoins non trouvé");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formulaire de besoins non trouvé.");
            }

            Optional<Materiel> materielOptional = materielService.findById(materielId);
            if (!materielOptional.isPresent()) {
                logger.error("Matériel non trouvé");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Matériel non trouvé.");
            }

            Optional<Personnel> personnelOptional = personnelService.findById(personnelId);
            if (!personnelOptional.isPresent()) {
                logger.error("Personnel non trouvé");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Personnel non trouvé.");
            }

            // Create and save FormulaireMateriel
            FormulaireMateriel formulaireMateriel = new FormulaireMateriel();
            formulaireMateriel.setFormulaireBesoins(formulaireBesoinsOptional.get());
            formulaireMateriel.setMateriel(materielOptional.get());
            formulaireMateriel.setQuantite(quantity);
            formulaireMateriel.setPersonnel(personnelOptional.get());

            FormulaireMateriel createdFormulaireMateriel = formulaireMaterielService.save(formulaireMateriel);

            // Confirm save and return response
            logger.info("FormulaireMateriel créé avec succès: " + createdFormulaireMateriel);
            return new ResponseEntity<>(createdFormulaireMateriel, HttpStatus.CREATED);
        } catch (NumberFormatException e) {
            logger.error("Invalid number format", e);
            return ResponseEntity.badRequest().body("Invalid number format: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Erreur lors de la création du formulaire matériel", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création du formulaire matériel: " + e.getMessage());
        }
    }

    private Integer getIntegerFromPayload(Map<String, Object> payload, String key) {
        Object value = payload.get(key);
        if (value == null) {
            return null;
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            logger.error("Failed to parse integer for key: " + key, e);
            return null;
        }
    }

}
