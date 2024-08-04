package ma.Stock.controller;

import ma.Stock.entities.ArticleDemande;
import ma.Stock.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDemande> getArticleById(@PathVariable int id) {
        Optional<ArticleDemande> article = articleService.findById(id);
        return article.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ArticleDemande> createArticle(@RequestBody ArticleDemande article) {
        System.out.println("Received article data: " + article);
        ArticleDemande savedArticle = articleService.save(article);
        return ResponseEntity.ok(savedArticle);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ArticleDemande> updateArticle(@PathVariable int id, @RequestBody ArticleDemande articleDetails) {
        System.out.println("Received update request for Article with ID: " + id);
        System.out.println("Article details: " + articleDetails);

        Optional<ArticleDemande> article = articleService.findById(id);
        if (article.isPresent()) {
            ArticleDemande existingArticle = article.get();
            existingArticle.setQuantite(articleDetails.getQuantite());
            existingArticle.setMateriel(articleDetails.getMateriel());
            existingArticle.setFournisseur(articleDetails.getFournisseur()); // Mise à jour du fournisseur
            ArticleDemande updatedArticle = articleService.save(existingArticle);
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable int id) {
        articleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ArticleDemande>> getAllArticles() {
        List<ArticleDemande> articles = articleService.findAll();
        return ResponseEntity.ok(articles);
    }
}
