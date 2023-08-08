
const apiUrl = 'https://back-end-site-dra-camila.vercel.app/token';

$(function () {
  
  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ocorreu um erro na requisição.');
    }
    return response.json();
  })
  .then(data => {
  const {token} = data

  console.log(token)

  const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=media_url,media_type,caption,permalink&limit=15`;
  
  const imageLink = $('.instagram-image');
  const linkImageInsta = $('.instagram-link');

  
  const storedDataJsonArrayString = localStorage.getItem('instagramData');
  const storedDataJson = JSON.parse(storedDataJsonArrayString);

  $.get(url).then(function (response) {
    const dataJson = response.data;
   

    const imgUrl = dataJson.filter(data => data.media_type === 'IMAGE');
    const imgUrlCaroulsel = dataJson.filter(data => data.media_type === 'CAROUSEL_ALBUM');
    
    const listImages = [ ...imgUrlCaroulsel,  ...imgUrl]
    
    const isDataUpdated = JSON.stringify(listImages) !== storedDataJsonArrayString

    // Atualizar os dados armazenados se houver alterações
    if (isDataUpdated) {
      const dataJsonString = JSON.stringify(listImages);
      localStorage.setItem('instagramData', dataJsonString);
    }

    storedDataJson.forEach((data, index) => {
      
      const imageUrl = data.media_url;
      const postLink = data.permalink;
  
      const imageTag = imageLink.eq(index);
      const linkTag = linkImageInsta.eq(index);
  
      imageTag.attr('src', imageUrl);
      linkTag.attr('href', postLink);
    });
  });

  })
  .catch(error => {
    console.error('Ocorreu um erro na requisição:', error.message);
  });
});


