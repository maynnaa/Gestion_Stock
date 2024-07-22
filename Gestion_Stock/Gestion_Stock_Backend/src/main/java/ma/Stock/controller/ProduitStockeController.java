package ma.Stock.controller;

import ma.Stock.entities.Produit_Stocke;
import ma.Stock.service.ProduitStockeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produit")
public class ProduitStockeController {

    private final ProduitStockeService produitStockeService;

    @Autowired
    public ProduitStockeController(ProduitStockeService produitStockeService) {
        this.produitStockeService = produitStockeService;
    }

    @GetMapping
    public ResponseEntity<List<Produit_Stocke>> getAllProduitsStockes() {
        List<Produit_Stocke> produits = produitStockeService.findAll();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit_Stocke> getProduitStockeById(@PathVariable("id") int id) {
        Optional<Produit_Stocke> produitOptional = produitStockeService.findById(id);
        return produitOptional
                .map(produit -> new ResponseEntity<>(produit, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Produit_Stocke> createProduitStocke(@RequestBody Produit_Stocke produitStocke) {
        Produit_Stocke createdProduitStocke = produitStockeService.save(produitStocke);
        return new ResponseEntity<>(createdProduitStocke, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit_Stocke> updateProduitStocke(@PathVariable("id") int id, @RequestBody Produit_Stocke updatedProduitStocke) {
        Produit_Stocke updated = produitStockeService.save(updatedProduitStocke);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduitStocke(@PathVariable("id") int id) {
        produitStockeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
