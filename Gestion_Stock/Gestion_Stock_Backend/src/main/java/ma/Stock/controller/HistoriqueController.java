package ma.Stock.controller;

import ma.Stock.entities.Historique;
import ma.Stock.service.HistoriqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/historique")
public class HistoriqueController {

    private final HistoriqueService historiqueService;

    @Autowired
    public HistoriqueController(HistoriqueService historiqueService) {
        this.historiqueService = historiqueService;
    }

    @GetMapping
    public ResponseEntity<List<Historique>> getAllHistoriques() {
        List<Historique> historiques = historiqueService.findAll();
        return new ResponseEntity<>(historiques, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Historique> getHistoriqueById(@PathVariable("id") int id) {
        Optional<Historique> historiqueOptional = historiqueService.findById(id);
        return historiqueOptional
                .map(historique -> new ResponseEntity<>(historique, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Historique> createHistorique(@RequestBody Historique historique) {
        Historique createdHistorique = historiqueService.save(historique);
        return new ResponseEntity<>(createdHistorique, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Historique> updateHistorique(@PathVariable("id") int id, @RequestBody Historique updatedHistorique) {
        Historique updated = historiqueService.save(updatedHistorique);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistorique(@PathVariable("id") int id) {
        historiqueService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
