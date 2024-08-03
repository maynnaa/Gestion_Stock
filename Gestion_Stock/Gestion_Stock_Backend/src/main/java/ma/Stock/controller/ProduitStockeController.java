package ma.Stock.controller;

import ma.Stock.entities.Fournisseur;
import ma.Stock.entities.Produit_Stocke;
import ma.Stock.service.FournisseurService;
import ma.Stock.service.ProduitStockeService;
import ma.Stock.service.MaterielService;
import ma.Stock.entities.Materiel;
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
    private final MaterielService materielService;
    private final FournisseurService fournisseurService;

    @Autowired
    public ProduitStockeController(ProduitStockeService produitStockeService, MaterielService materielService, FournisseurService fournisseurService) {
        this.produitStockeService = produitStockeService;
        this.materielService = materielService;
        this.fournisseurService = fournisseurService;
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
    public ResponseEntity<?> createProduitStocke(@RequestBody Produit_Stocke produitStocke) {
        try {
            System.out.println("Données reçues: " + produitStocke);

            if (produitStocke.getMateriel() == null || produitStocke.getMateriel().getId_materiel() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID du matériel manquant.");
            }

            Optional<Materiel> materielOptional = materielService.findById(produitStocke.getMateriel().getId_materiel());
            if (!materielOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Materiel non trouvé.");
            }

            produitStocke.setMateriel(materielOptional.get());

            if (produitStocke.getFournisseur() == null || produitStocke.getFournisseur().getFournisseur_id() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID du fournisseur manquant.");
            }

            Optional<Fournisseur> fournisseurOptional = fournisseurService.findById(produitStocke.getFournisseur().getFournisseur_id());
            if (!fournisseurOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fournisseur non trouvé.");
            }

            produitStocke.setFournisseur(fournisseurOptional.get());

            Produit_Stocke createdProduitStocke = produitStockeService.save(produitStocke);
            return new ResponseEntity<>(createdProduitStocke, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création du produit: " + e.getMessage());
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Produit_Stocke> updateProduitStocke(@PathVariable("id") int id, @RequestBody Produit_Stocke updatedProduitStocke) {
        Produit_Stocke updated = produitStockeService.save(updatedProduitStocke);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduitStocke(@PathVariable("id") int id) {
        produitStockeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
}
