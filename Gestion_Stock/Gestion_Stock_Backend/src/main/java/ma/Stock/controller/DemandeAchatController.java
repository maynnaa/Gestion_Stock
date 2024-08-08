package ma.Stock.controller;

import ma.Stock.entities.DemandeAchat;
import ma.Stock.service.DemandeAchatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/demandeAchat")
public class DemandeAchatController {

    @Autowired
    private DemandeAchatService demandeAchatService;

    @GetMapping("/{id}")
    public ResponseEntity<DemandeAchat> getDemandeAchatById(@PathVariable int id) {
        System.out.println("Fetching DemandeAchat with ID: " + id);
        Optional<DemandeAchat> demandeAchat = demandeAchatService.findById(id);
        return demandeAchat.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<DemandeAchat> getAllDemandeAchats() {
        return demandeAchatService.findAll();
    }

    @PostMapping
    public ResponseEntity<DemandeAchat> createDemandeAchat(@RequestBody DemandeAchat demandeAchat) {
        System.out.println("Creating DemandeAchat: " + demandeAchat);
        DemandeAchat savedDemandeAchat = demandeAchatService.save(demandeAchat);
        return ResponseEntity.ok(savedDemandeAchat);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandeAchat> updateDemandeAchat(@PathVariable int id, @RequestBody DemandeAchat demandeAchatDetails) {
        Optional<DemandeAchat> demandeAchat = demandeAchatService.findById(id);
        if (demandeAchat.isPresent()) {
            DemandeAchat updatedDemandeAchat = demandeAchat.get();
            updatedDemandeAchat.setDate_demande(demandeAchatDetails.getDate_demande());
            updatedDemandeAchat.setPersonnel(demandeAchatDetails.getPersonnel());
            demandeAchatService.save(updatedDemandeAchat);
            return ResponseEntity.ok(updatedDemandeAchat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemandeAchat(@PathVariable int id) {
        Optional<DemandeAchat> demandeAchat = demandeAchatService.findById(id);
        if (demandeAchat.isPresent()) {
            demandeAchatService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
