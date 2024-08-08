package ma.Stock.controller;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.service.FormulaireBesoinsService;
import ma.Stock.service.MaterielService;
import ma.Stock.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/formulaireBesoins")
public class FormulaireBesoinsController {

    @Autowired
    private FormulaireBesoinsService formulaireBesoinsService;

    @Autowired
    private MaterielService materielService;

    @Autowired
    private PersonnelService personnelService;

    private static final Logger logger = LoggerFactory.getLogger(FormulaireBesoinsController.class);

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
            return ResponseEntity.ok(savedFormulaireBesoins);
        } catch (Exception e) {
            logger.error("Error creating FormulaireBesoins", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
