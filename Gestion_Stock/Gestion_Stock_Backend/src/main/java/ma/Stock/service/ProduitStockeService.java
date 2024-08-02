package ma.Stock.service;

import ma.Stock.entities.Produit_Stocke;
import ma.Stock.repository.ProduitStockeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitStockeService {

    @Autowired
    private ProduitStockeRepository produitStockeRepository;

    public List<Produit_Stocke> findAll() {
        return produitStockeRepository.findAll();
    }

    public Optional<Produit_Stocke> findById(int id) {
        return produitStockeRepository.findById(id);
    }

    public void deleteById(int id) {
        produitStockeRepository.deleteById(id);
    }



    public Produit_Stocke save(Produit_Stocke produitStocke) {
        return produitStockeRepository.save(produitStocke);
    }
}
