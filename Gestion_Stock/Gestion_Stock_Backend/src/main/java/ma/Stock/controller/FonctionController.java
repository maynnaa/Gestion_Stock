package ma.Stock.controller;

import ma.Stock.entities.Fonction;
import ma.Stock.service.FonctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fonction")
public class FonctionController {

    private final FonctionService fonctionService;

    @Autowired
    public FonctionController(FonctionService fonctionService) {
        this.fonctionService = fonctionService;
    }

    @GetMapping
    public ResponseEntity<List<Fonction>> getAllFonctions() {
        List<Fonction> fonctions = fonctionService.findAll();
        return new ResponseEntity<>(fonctions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fonction> getFonctionById(@PathVariable("id") int id) {
        Optional<Fonction> fonctionOptional = fonctionService.findById(id);
        return fonctionOptional
                .map(fonction -> new ResponseEntity<>(fonction, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Fonction> createFonction(@RequestBody Fonction fonction) {
        Fonction createdFonction = fonctionService.save(fonction);
        return new ResponseEntity<>(createdFonction, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fonction> updateFonction(@PathVariable("id") int id, @RequestBody Fonction updatedFonction) {
        Fonction updated = fonctionService.save(updatedFonction);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFonction(@PathVariable("id") int id) {
        fonctionService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
