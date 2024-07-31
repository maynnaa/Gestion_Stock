package ma.Stock.controller;

import ma.Stock.entities.Personnel;
import ma.Stock.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personnel")
public class PersonnelController {

    private final PersonnelService personnelService;

    @Autowired
    public PersonnelController(PersonnelService personnelService) {
        this.personnelService = personnelService;
    }

    @GetMapping
    public ResponseEntity<List<Personnel>> getAllPersonnels() {
        List<Personnel> personnels = personnelService.findAll();
        return new ResponseEntity<>(personnels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personnel> getPersonnelById(@PathVariable("id") int id) {
        Optional<Personnel> personnelOptional = personnelService.findById(id);
        return personnelOptional
                .map(personnel -> new ResponseEntity<>(personnel, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Personnel> createPersonnel(@RequestBody Personnel personnel) {
        Personnel createdPersonnel = personnelService.save(personnel);
        return new ResponseEntity<>(createdPersonnel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personnel> updatePersonnel(@PathVariable("id") int id, @RequestBody Personnel updatedPersonnel) {
        Personnel updated = personnelService.save(updatedPersonnel);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonnel(@PathVariable("id") int id) {
        personnelService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        // Implémentez la logique d'authentification ici
        Optional<Personnel> personnelOptional = personnelService.findByEmail(email);
        if (personnelOptional.isPresent()) {
            Personnel personnel = personnelOptional.get();
            if (personnel.getPassword().equals(password)) {
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Mot de passe incorrect", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Utilisateur introuvable", HttpStatus.NOT_FOUND);
        }
    }


}
