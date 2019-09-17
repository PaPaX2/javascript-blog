'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  // console.log('links:', links);
  });
*/
{
  const
    optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a';

  const titleClickHandler = function (event) {
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

    // console.log('clickedElement:', clickedElement);

    // [DONE] remove class 'active' from all articles

    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    // [DONE] get 'href' attribute from the clicked link

    const articleSelector = clickedElement.getAttribute('href');
    // console.log(articleSelector);

    // [DONE] find the correct article using the selector (value of 'href' attribute)

    const targetArticle = document.querySelector(articleSelector);
    // console.log(targetArticle);

    // [DONE] add class 'active' to the correct article

    targetArticle.classList.add('active');
  };

  //SECOND PART OF MODULE 6 | 1st way

  /* const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks() {

  // [DONE] remove contents of titleList
  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

  // [DONE] for each article

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(optArticleSelector);
  for (let article of articles) {

    //[DONE] get the article id

    const articleId = article.getAttribute('id');
    // console.log('article id:', articleId);

    // [DONE] find the title element

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // [DONE] get the title from the title element & create HTML of the link

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('link html:', linkHTML);

    document.querySelector('.titles').insertAdjacentHTML('beforeend', linkHTML);
  }
  }

  generateTitleLinks();
  const links = document.querySelectorAll('.titles a');
  // console.log('stała links:', links)

  for (let link of links) {
  link.addEventListener('click', titleClickHandler);
  }
  */

  //SECOND PART OF MODULE 6 | 2nd way



  function generateTitleLinks(customSelector = '') {
  //remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    // find all the articles and save them to variable: articles
    let articles = document.querySelectorAll(optArticleSelector + customSelector);
    // console.log('artykuły:', articles);

    let html = '';

    for (let article of articles) {
    // get the article id
      const articleId = article.getAttribute('id');
      // console.log('article id:', articleId);

      // find the title element
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      // console.log('tytuł arykułu:', articleTitle);

      // get the title from the title element

      // create HTML of the link
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // console.log('link html:', linkHTML);

      // insert link into html variable
      html = html + linkHTML;
      // console.log(html);
    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  // console.log('stała links:', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    // console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      // console.log('stała tagList:', optArticleTagSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      // console.log('articleTags:', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      // console.log('tablica tagów:', articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
      //console.log(tag);

        /* generate HTML of the link */
        const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        // console.log(linkHtml);
        /* add generated code to html variable */

        html = html + linkHtml;

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      console.log(html);
      /* END LOOP: for every article: */
    }
  }

  generateTags();

  const tagClickHandler = function (event) {
    //console.log('Link was clicked!');
    //console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log('tag:', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */

    const targetTag = document.querySelectorAll('a[href^="#tag-' + tag + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of targetTag) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    
  };
  

  function addClickListenersToTags() {
  /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagSelector);
    //console.log(tagLinks);

    /* START LOOP: for each link */
    for (let tag of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */

  }
  addClickListenersToTags();



}
