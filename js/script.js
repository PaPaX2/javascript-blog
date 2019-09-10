'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/
{
    const titleClickHandler = function () {
        console.log('Link was clicked!');
        console.log(event);

        // [DONE] remove class 'active' from all article links

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        // [DONE] add class 'active' to the clicked link

        event.preventDefault();

        const clickedElement = this;
        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        // [DONE] remove class 'active' from all articles

        const activeArticles = document.querySelectorAll('.post');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        // [DONE] get 'href' attribute from the clicked link

        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);

        // [DONE] find the correct article using the selector (value of 'href' attribute)

        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);

        // [DONE] add class 'active' to the correct article

        targetArticle.classList.add('active');
    }

    //SECOND PART OF MODULE 6 | 1st way

    /* const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        // [DONE] remove contents of titleList
        const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

        // [DONE] for each article

        const articles = document.querySelectorAll(optArticleSelector);
        console.log(optArticleSelector);
        for (let article of articles) {

            //[DONE] get the article id

            const articleId = article.getAttribute('id');
            console.log('article id:', articleId);

            // [DONE] find the title element

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            // [DONE] get the title from the title element & create HTML of the link

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log('link html:', linkHTML);

            document.querySelector('.titles').insertAdjacentHTML('beforeend', linkHTML);
        }
    }

    generateTitleLinks();
    const links = document.querySelectorAll('.titles a');
    console.log('stała links:', links)

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    */

    //SECOND PART OF MODULE 6 | 2nd way

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagSelector = '.post-tags .list';

    function generateTitleLinks() {
        //remove contents of titleList
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        // find all the articles and save them to variable: articles
        let articles = document.querySelectorAll(optArticleSelector);
        //console.log('artykuły:', articles);

        let html = '';

        for (let article of articles) {
            // get the article id
            const articleId = article.getAttribute('id');
            //   console.log('article id:', articleId);

            // find the title element
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            //console.log('tytuł arykułu:', articleTitle);

            // get the title from the title element

            // create HTML of the link
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            //console.log('link html:', linkHTML);

            // insert link into html variable
            html = html + linkHTML;
            console.log(html);
        }

        titleList.innerHTML = html;
    }

    generateTitleLinks();
    const links = document.querySelectorAll('.titles a');
    console.log('stała links:', links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

    function generateTags() {
    
        /* find all articles */

        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);

        /* START LOOP: for every article: */
        for (let article of articles) {
        
        /* find tags wrapper */
            const tagList = article.querySelector(optArticleTagSelector);
            console.log('stała tagList:', optArticleTagSelector);
        }
        /* make html variable with empty string */

            let html = '';
            
        /* get tags from data-tags attribute */

        /* split tags into array */

        /* START LOOP: for each tag */

        /* generate HTML of the link */

        /* add generated code to html variable */

        /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
        }   

    generateTags();



}
