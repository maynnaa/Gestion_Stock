package ma.Stock.controller;

import ma.Stock.entities.Type_Materiel;
import ma.Stock.service.TypeMaterielService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/type-materiel")
public class TypeMaterielController {

    private final TypeMaterielService typeMaterielService;

    @Autowired
    public TypeMaterielController(TypeMaterielService typeMaterielService) {
        this.typeMaterielService = typeMaterielService;
    }

    @GetMapping
    public ResponseEntity<List<Type_Materiel>> getAllTypesMateriel() {
        List<Type_Materiel> typesMateriel = typeMaterielService.findAll();
        return new ResponseEntity<>(typesMateriel, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type_Materiel> getTypeMaterielById(@PathVariable("id") int id) {
        Optional<Type_Materiel> typeMaterielOptional = typeMaterielService.findById(id);
        return typeMaterielOptional
                .map(typeMateriel -> new ResponseEntity<>(typeMateriel, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Type_Materiel> createTypeMateriel(@RequestBody Type_Materiel typeMateriel) {
        Type_Materiel createdTypeMateriel = typeMaterielService.save(typeMateriel);
        return new ResponseEntity<>(createdTypeMateriel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type_Materiel> updateTypeMateriel(@PathVariable("id") int id, @RequestBody Type_Materiel updatedTypeMateriel) {
        Type_Materiel updated = typeMaterielService.save(updatedTypeMateriel);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeMateriel(@PathVariable("id") int id) {
        typeMaterielService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
