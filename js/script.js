/* eslint-disable no-prototype-builtins */
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
};
{
  const
    optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorSelectorLink = '.post-author a',
    optAuthorListSelector = '.authors a',
    optTagsListSelector = '.tags a',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) {
    //console.log('Link was clicked!');
    //console.log(event);

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
    //console.log('articleSelector: ', articleSelector);

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
    //console.log('artykuły:', articles);

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
      //Without Handlebars
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      
      //With Handlebars
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTMLarticle', linkHTML);
      

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

  function calculateTagsParams(tags) {
    
    // [VERY NEW] create a new variable object params with max and min value
    const params = {max: '0', min: '999999'};

    // [VERY NEW] START LOOP for every tags
    for (let tag in tags) {
      //console.log(tag + ' is used ' + tags[tag] + ' times');
      

      // [VERY NEW] set value for params.max as tags[tag] only if the value is higher than current

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  calculateTagsParams();

  function calculateTagClass(count, tagsParams) {
    const normalizedCount = count - tagsParams.min;
    const normalizedMax = tagsParams.max - tagsParams.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
    const tagsClass = optCloudClassPrefix + classNumber;
    //console.log(tagsClass);
    return tagsClass;
  }
 

  function generateTags() {
    
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      //console.log('stała tagList:', optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      // console.log('articleTags:', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      //console.log('tablica tagów:', articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {
      //console.log(tag);

        /* generate HTML of the link */
        //Without Handlebars:
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        
        //With Handlebars
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log('linkHTMLtag: ', linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)) {
          //NEW add tag to allTags object
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      //console.log('html: ', html);
      
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    
    // [VERY NEW] counting number of occurences of allTags
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams: ', tagsParams);
    
    // [NEW] create variable for all links HTML code
    //Without Handlebars:
    //let allTagsHTML = '';
    
    //With Handlebars
    const allTagsData = {tags: []};

    // [NEW] START LOOP: for each tag in allTags
    for (let tag in allTags) {
      //console.log('tag: ', tag, 'allTags: ', allTags);
    
      //[NEW] Generate code of a link and add it to allTagsHTML
      //Without Handlebars:
      //allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log('allTags[tag]', allTags[tag], tagsParams);
      
      //With Handlebars
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    // [NEW] END LOOP: for each tag i allTags
    }

    /* [NEW] add html from allTagsHTML to tagList */
    //Without Handlebars:
    //tagList.innerHTML = allTagsHTML;
    
    //With Handlebars:
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('tablica tagów: ', allTagsData);
  }

  generateTags();

  const tagClickHandler = function (event) {
    //console.log('Link was clicked!');
    //console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('this: ', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('clickedElement: ', href);

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
    const tagLinks = document.querySelectorAll(optArticleTagSelector + ',' + optTagsListSelector);
    //console.log(tagLinks);

    /* START LOOP: for each link */
    for (let tag of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */

  }
  addClickListenersToTags();

  function generateAuthors() {
    
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all authors */
    const authors = document.querySelectorAll(optArticleSelector);
    //console.log('autorzy:', authors);
    
    /* START LOOP: for every author: */
    for (let author of authors) {
      //console.log('author: ', author);
      //console.log('authors: ', authors);

      /* find author wrapper */
      const authorList = author.querySelector(optArticleAuthorSelector);
      //console.log('lista autorów:', authorList);

      /* make html variable with empty string */

      let html = '';

      /* get author from data-author attribute */

      const articleAuthor = author.getAttribute('data-author');
      //console.log('autor: ', articleAuthor);

      /* generate HTML of the link */
      // Without Handlebars:
      //const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
      
      //With Handlebars
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      
      console.log('linkHTMLauthor', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors.hasOwnProperty(articleAuthor)) {
        //NEW add tag to allTags object
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
        //console.log('allAuthors: ', allAuthors);
      }

      /* insert HTML of all the links into the author wrapper */
      authorList.innerHTML = html;
      //console.log(html);
      /* END LOOP: for every article: */
    }
    //find authors in right column
    const authorList = document.querySelector('.authors');
    //console.log('auhorList: ', authorList);

    //create variable for all links HTML code
    let allAuthorsHTML = '';

    //START LOOP: each author in authors
    for (let author in allAuthors) {
      //console.log('allAuthors: ', allAuthors);
      //console.log('author: ',author);

      //Generate code of a link for allAuthorsHTML
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '</a>( ' + allAuthors[author] + ')</li>';
    
    //END LOOP for each author
    }

    //add html from allAuthorsHTML to authorList
    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthors();


  const authorClickHandler = function (event) {
    //console.log('Link was clicked!');
    //console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('this: ', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('href: ', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    //console.log('autor:', author);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {

      /* remove class active */
      activeAuthor.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */

    const targetAuthor = document.querySelectorAll('a[href^="#author-' + author + '"]');

    /* START LOOP: for each found tag link */
    for (let authorLink of targetAuthor) {

      /* add class active */
      authorLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
    
  };

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll(optArticleAuthorSelectorLink + ',' + optAuthorListSelector);
    //console.log(tagLinks);
  
    /* START LOOP: for each link */
    for (let author of authorLinks) {
  
      /* add tagClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
    
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();




}
