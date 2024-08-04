package ma.Stock.service;

import ma.Stock.entities.ArticleAffecte;
import ma.Stock.entities.ArticleDemande;

import ma.Stock.entities.Personnel;
import ma.Stock.entities.Produit_Stocke;
import ma.Stock.repository.ArticleAffecteRepository;
import ma.Stock.repository.ArticleRepository;

import ma.Stock.repository.PersonnelRepository;
import ma.Stock.repository.ProduitStockeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleAffecteService {
    @Autowired
    private ArticleAffecteRepository articleAffecteRepository;
    private PersonnelRepository personnelRepository;
    private ProduitStockeRepository produitStockeRepository;

    public Optional<ArticleAffecte> findById(int id) {
        return articleAffecteRepository.findById(id);
    }

    public ArticleAffecte save(ArticleAffecte article) {
        return articleAffecteRepository.save(article);
    }

    public void deleteById(int id) {
        articleAffecteRepository.deleteById(id);
    }

    public List<ArticleAffecte> findAll() {
        return articleAffecteRepository.findAll();
    }


}
