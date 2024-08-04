package ma.Stock.controller;

import ma.Stock.entities.ArticleAffecte;
import ma.Stock.entities.Personnel;
import ma.Stock.entities.Produit_Stocke;
import ma.Stock.repository.ArticleAffecteRepository;
import ma.Stock.repository.PersonnelRepository;
import ma.Stock.repository.ProduitStockeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/articleAffecte")
public class ArticleAffecteController {

    @Autowired
    private ArticleAffecteRepository articleAffecteRepository;

    @Autowired
    private ProduitStockeRepository produitStockeRepository;

    @Autowired
    private PersonnelRepository personnelRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/assign")
    public ResponseEntity<?> assignPPR(@RequestBody Map<String, String> payload) {
        String ppr = payload.get("ppr");
        Integer produitId = Integer.valueOf(payload.get("produitId"));

        Produit_Stocke produitStocke = produitStockeRepository.findById(produitId).orElse(null);
        Personnel personnel = personnelRepository.findByPpr(ppr);

        if (produitStocke == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produit non trouvé.");
        }
        if (personnel == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Personnel non trouvé.");
        }

        ArticleAffecte articleAffecte = new ArticleAffecte();
        articleAffecte.setProduitStocke(produitStocke);
        articleAffecte.setPersonnel(personnel);

        ArticleAffecte savedArticleAffecte = articleAffecteRepository.save(articleAffecte);
        return ResponseEntity.ok(savedArticleAffecte);
    }
}
