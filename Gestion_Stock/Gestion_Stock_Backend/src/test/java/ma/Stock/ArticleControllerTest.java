package ma.Stock;

import ma.Stock.controller.ArticleController;
import ma.Stock.entities.Article;
import ma.Stock.service.ArticleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ArticleController.class)
public class ArticleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleService articleService;

    private Article article;

    @BeforeEach
    public void setup() {
        article = new Article(1, 10, null, null, null);
    }

    @Test
    public void testGetArticleById() throws Exception {
        given(articleService.findById(1)).willReturn(Optional.of(article));

        mockMvc.perform(get("/api/articles/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id_article", is(article.getId_article())))
                .andExpect(jsonPath("$.quantite", is(article.getQuantite())));
    }

    @Test
    public void testCreateArticle() throws Exception {
        given(articleService.save(any(Article.class))).willReturn(article);

        String articleJson = "{ \"quantite\": 10 }";

        mockMvc.perform(post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id_article", is(article.getId_article())))
                .andExpect(jsonPath("$.quantite", is(article.getQuantite())));
    }

    @Test
    public void testUpdateArticle() throws Exception {
        given(articleService.findById(1)).willReturn(Optional.of(article));
        given(articleService.save(any(Article.class))).willReturn(article);

        String articleJson = "{ \"quantite\": 20 }";

        mockMvc.perform(put("/api/articles/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(articleJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id_article", is(article.getId_article())))
                .andExpect(jsonPath("$.quantite", is(20)));
    }

    @Test
    public void testDeleteArticle() throws Exception {
        mockMvc.perform(delete("/api/articles/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testGetAllArticles() throws Exception {
        Article article2 = new Article(2, 20, null, null, null);
        given(articleService.findAll()).willReturn(Arrays.asList(article, article2));

        mockMvc.perform(get("/api/articles")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id_article", is(article.getId_article())))
                .andExpect(jsonPath("$[1].id_article", is(article2.getId_article())));
    }
}
