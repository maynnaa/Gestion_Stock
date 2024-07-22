package ma.Stock.controller;

import ma.Stock.entities.Type_Entite;
import ma.Stock.service.TypeEntiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/type-entite")
public class TypeEntiteController {

    private final TypeEntiteService typeEntiteService;

    @Autowired
    public TypeEntiteController(TypeEntiteService typeEntiteService) {
        this.typeEntiteService = typeEntiteService;
    }

    @GetMapping
    public ResponseEntity<List<Type_Entite>> getAllTypesEntite() {
        List<Type_Entite> typesEntite = typeEntiteService.findAll();
        return new ResponseEntity<>(typesEntite, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type_Entite> getTypeEntiteById(@PathVariable("id") int id) {
        Optional<Type_Entite> typeEntiteOptional = typeEntiteService.findById(id);
        return typeEntiteOptional
                .map(typeEntite -> new ResponseEntity<>(typeEntite, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Type_Entite> createTypeEntite(@RequestBody Type_Entite typeEntite) {
        Type_Entite createdTypeEntite = typeEntiteService.save(typeEntite);
        return new ResponseEntity<>(createdTypeEntite, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type_Entite> updateTypeEntite(@PathVariable("id") int id, @RequestBody Type_Entite updatedTypeEntite) {
        Type_Entite updated = typeEntiteService.save(updatedTypeEntite);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeEntite(@PathVariable("id") int id) {
        typeEntiteService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
