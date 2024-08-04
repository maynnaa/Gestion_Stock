package ma.Stock.service;

import ma.Stock.entities.ArticleDemande;
import ma.Stock.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public Optional<ArticleDemande> findById(int id) {
        return articleRepository.findById(id);
    }

    public ArticleDemande save(ArticleDemande article) {
        return articleRepository.save(article);
    }

    public void deleteById(int id) {
        articleRepository.deleteById(id);
    }

    public List<ArticleDemande> findAll() {
        return articleRepository.findAll();
    }

}
