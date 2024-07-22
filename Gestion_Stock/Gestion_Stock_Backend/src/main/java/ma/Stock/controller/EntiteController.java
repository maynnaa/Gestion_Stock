package ma.Stock.controller;

import ma.Stock.entities.Entite;
import ma.Stock.service.EntiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entite")
public class EntiteController {

    private final EntiteService entiteService;

    @Autowired
    public EntiteController(EntiteService entiteService) {
        this.entiteService = entiteService;
    }

    @GetMapping
    public ResponseEntity<List<Entite>> getAllEntites() {
        List<Entite> entites = entiteService.findAll();
        return new ResponseEntity<>(entites, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entite> getEntiteById(@PathVariable("id") int id) {
        Optional<Entite> entiteOptional = entiteService.findById(id);
        return entiteOptional
                .map(entite -> new ResponseEntity<>(entite, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Entite> createEntite(@RequestBody Entite entite) {
        Entite createdEntite = entiteService.save(entite);
        return new ResponseEntity<>(createdEntite, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entite> updateEntite(@PathVariable("id") int id, @RequestBody Entite updatedEntite) {
        Entite updated = entiteService.save(updatedEntite);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntite(@PathVariable("id") int id) {
        entiteService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
