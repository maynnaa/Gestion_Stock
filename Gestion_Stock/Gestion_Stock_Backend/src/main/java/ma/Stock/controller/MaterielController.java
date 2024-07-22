package ma.Stock.controller;

import ma.Stock.entities.Materiel;
import ma.Stock.service.MaterielService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materiel")
public class MaterielController {

    private final MaterielService materielService;

    @Autowired
    public MaterielController(MaterielService materielService) {
        this.materielService = materielService;
    }

    @GetMapping
    public ResponseEntity<List<Materiel>> getAllMateriels() {
        List<Materiel> materiels = materielService.findAll();
        return new ResponseEntity<>(materiels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materiel> getMaterielById(@PathVariable("id") int id) {
        Optional<Materiel> materielOptional = materielService.findById(id);
        return materielOptional
                .map(materiel -> new ResponseEntity<>(materiel, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Materiel> createMateriel(@RequestBody Materiel materiel) {
        Materiel createdMateriel = materielService.save(materiel);
        return new ResponseEntity<>(createdMateriel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materiel> updateMateriel(@PathVariable("id") int id, @RequestBody Materiel updatedMateriel) {
        Materiel updated = materielService.save(updatedMateriel);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMateriel(@PathVariable("id") int id) {
        materielService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
