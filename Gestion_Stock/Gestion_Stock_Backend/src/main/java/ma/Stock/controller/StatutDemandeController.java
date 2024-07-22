package ma.Stock.controller;

import ma.Stock.entities.Statut_demande;
import ma.Stock.service.StatutDemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/statut-demande")
public class StatutDemandeController {

    private final StatutDemandeService statutDemandeService;

    @Autowired
    public StatutDemandeController(StatutDemandeService statutDemandeService) {
        this.statutDemandeService = statutDemandeService;
    }

    @GetMapping
    public ResponseEntity<List<Statut_demande>> getAllStatutsDemande() {
        List<Statut_demande> statutsDemande = statutDemandeService.findAll();
        return new ResponseEntity<>(statutsDemande, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Statut_demande> getStatutDemandeById(@PathVariable("id") int id) {
        Optional<Statut_demande> statutDemandeOptional = statutDemandeService.findById(id);
        return statutDemandeOptional
                .map(statutDemande -> new ResponseEntity<>(statutDemande, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Statut_demande> createStatutDemande(@RequestBody Statut_demande statutDemande) {
        Statut_demande createdStatutDemande = statutDemandeService.save(statutDemande);
        return new ResponseEntity<>(createdStatutDemande, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Statut_demande> updateStatutDemande(@PathVariable("id") int id, @RequestBody Statut_demande updatedStatutDemande) {
        Statut_demande updated = statutDemandeService.save(updatedStatutDemande);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatutDemande(@PathVariable("id") int id) {
        statutDemandeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
