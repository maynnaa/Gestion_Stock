package ma.Stock.controller;

import ma.Stock.entities.Personnel;
import ma.Stock.service.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    @GetMapping("/{idPersonnel}/fonction")
    public ResponseEntity<Integer> getFonctionIdByPersonnelId(@PathVariable int idPersonnel) {
        Integer idFonction = personnelService.getFonctionIdByPersonnelId(idPersonnel);
        return ResponseEntity.ok(idFonction);
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
    public ResponseEntity<Map<String, Object>> login(@RequestParam String email, @RequestParam String password) {
        Optional<Personnel> personnelOptional = personnelService.findByEmail(email);
        if (personnelOptional.isPresent()) {
            Personnel personnel = personnelOptional.get();
            System.out.println("Personnel: " + personnel); // Log the personnel object
            if (personnel.getPassword().equals(password)) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                Integer functionId = personnel.getFonction().getId_fonction();
                Integer idPersonnel = personnel.getId_personnel(); // Assurez-vous que vous avez une méthode pour obtenir l'ID de l'utilisateur
                System.out.println("Function ID: " + functionId); // Log the function ID
                System.out.println("User ID: " + idPersonnel); // Log the user ID

                response.put("functionId", functionId);
                response.put("id_personnel", idPersonnel); // Ajoutez l'ID de l'utilisateur à la réponse

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Map.of("message", "Mot de passe incorrect"), HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(Map.of("message", "Utilisateur introuvable"), HttpStatus.NOT_FOUND);
        }
    }




}
