package ma.Stock.controller;

import ma.Stock.entities.Fournisseur;
import ma.Stock.service.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/fournisseur")
@CrossOrigin(origins = "http://localhost:3000")
public class FournisseurController {

    private final FournisseurService fournisseurService;

    @Autowired
    public FournisseurController(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    @GetMapping
    public ResponseEntity<List<Fournisseur>> getAllFournisseurs() {
        List<Fournisseur> fournisseurs = fournisseurService.findAll();
        return new ResponseEntity<>(fournisseurs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fournisseur> getFournisseurById(@PathVariable("id") int id) {
        Optional<Fournisseur> fournisseurOptional = fournisseurService.findById(id);
        return fournisseurOptional
                .map(fournisseur -> new ResponseEntity<>(fournisseur, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Fournisseur> createFournisseur(@RequestBody Fournisseur fournisseur) {
        Fournisseur createdFournisseur = fournisseurService.save(fournisseur);
        return new ResponseEntity<>(createdFournisseur, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fournisseur> updateFournisseur(@PathVariable("id") int id, @RequestBody Fournisseur updatedFournisseur) {
        Fournisseur updated = fournisseurService.save(updatedFournisseur);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFournisseur(@PathVariable("id") int id) {
        fournisseurService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
