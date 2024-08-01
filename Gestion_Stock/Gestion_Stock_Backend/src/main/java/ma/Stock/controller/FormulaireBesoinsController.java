package ma.Stock.controller;

import ma.Stock.entities.FormulaireBesoins;
import ma.Stock.service.FormulaireBesoinsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/formulaireBesoins")
public class FormulaireBesoinsController {

    @Autowired
    private FormulaireBesoinsService formulaireBesoinsService;

    @GetMapping("/{id}")
    public ResponseEntity<FormulaireBesoins> getFormulaireBesoinsById(@PathVariable int id) {
        Optional<FormulaireBesoins> formulaireBesoins = formulaireBesoinsService.findById(id);
        return formulaireBesoins.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<FormulaireBesoins> getAllFormulaireBesoins() {
        return formulaireBesoinsService.findAll();
    }

    @PostMapping
    public FormulaireBesoins createFormulaireBesoins(@RequestBody FormulaireBesoins formulaireBesoins) {
        return formulaireBesoinsService.save(formulaireBesoins);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormulaireBesoins> updateFormulaireBesoins(@PathVariable int id, @RequestBody FormulaireBesoins formulaireBesoinsDetails) {
        Optional<FormulaireBesoins> formulaireBesoins = formulaireBesoinsService.findById(id);
        if (formulaireBesoins.isPresent()) {
            FormulaireBesoins updatedFormulaireBesoins = formulaireBesoins.get();
            updatedFormulaireBesoins.setDate_creation(formulaireBesoinsDetails.getDate_creation());
            updatedFormulaireBesoins.setValidation(formulaireBesoinsDetails.getValidation());
            updatedFormulaireBesoins.setPersonnel(formulaireBesoinsDetails.getPersonnel());
            updatedFormulaireBesoins.setNotification(formulaireBesoinsDetails.getNotification());
            formulaireBesoinsService.save(updatedFormulaireBesoins);
            return ResponseEntity.ok(updatedFormulaireBesoins);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormulaireBesoins(@PathVariable int id) {
        Optional<FormulaireBesoins> formulaireBesoins = formulaireBesoinsService.findById(id);
        if (formulaireBesoins.isPresent()) {
            formulaireBesoinsService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
