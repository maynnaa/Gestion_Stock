package ma.Stock.controller;

import ma.Stock.entities.Demande;
import ma.Stock.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/demande")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @GetMapping("/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable int id) {
        Optional<Demande> demande = demandeService.findById(id);
        return demande.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Demande> createDemande(@RequestBody Demande demande) {
        Demande savedDemande = demandeService.save(demande);
        return ResponseEntity.ok(savedDemande);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Demande> updateDemande(@PathVariable int id, @RequestBody Demande demandeDetails) {
        Optional<Demande> demande = demandeService.findById(id);
        if (demande.isPresent()) {
            Demande existingDemande = demande.get();
            existingDemande.setDate_demande(demandeDetails.getDate_demande());
            existingDemande.setPersonnel(demandeDetails.getPersonnel());
            // Update other fields as necessary
            Demande updatedDemande = demandeService.save(existingDemande);
            return ResponseEntity.ok(updatedDemande);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemande(@PathVariable int id) {
        demandeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Demande>> getAllDemandes() {
        List<Demande> demandes = demandeService.findAll();
        return ResponseEntity.ok(demandes);
    }
}
