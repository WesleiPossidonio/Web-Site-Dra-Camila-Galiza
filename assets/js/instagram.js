// var feed = new Instafeed({
//   get: 'user',
//   userId: '49698855873',
//   accessToken: 'IGQVJWUWhIeG1hTFY4N3daaXFqN3BFeGpZAN0ZAyRnJaZADUtOHdRWTE3U2d0VGpRZAUdHQzJoYjBDNW5CUDNKZAG5oQ3MzY01jUUZAvRkEyNGEweS1OV1RWTkh1bHNEX1dWdGh6aEMtdF9wLWNEQXhoYXdUcwZDZD',
//   limit: 6,
//   template: `
//   <div class="col-6 col-md-4">
//   <a class="d-block instagram-link" href="" target="_blank">
//       <figure class="overlay overlay-1 hover-scale rounded">
//           <a href="" target="_blank">
//               <img class=" object-fit-cover instagram-image" src="" alt="Instagram image" />
//           </a>
//           <figcaption class="d-flex align-items-center justify-content-center mt-5">
//               <i class="uil uil-instagram z-index-2 lead text-white position-relative"></i>
//           </figcaption>
//       </figure>
//   </a>
// </div>`,
// after: function () {
//   // After the images are loaded, update the links and images
//   var links = document.getElementsByClassName('instagram-link');
//   var images = document.getElementsByClassName('instagram-image');
//   var row = document.getElementById('instafeed-row');

//   for (var i = 0; i < links.length; i++) {
//     var link = this.data[i].link;
//     var image = this.data[i].images.standard_resolution.url;

//     // Check if the link or image already exists
//     var isDuplicate = true;
//     for (var j = 0; j < i; j++) {
//       if (links[j].getAttribute('href') === link || images[j].getAttribute('src') === image) {
//         isDuplicate = false;
//         break;
//       }
//     }

//     if (!isDuplicate) {
//       links[i].setAttribute('href', link);
//       images[i].setAttribute('src', image);
//     }
//   }
// },
// });

// feed.run();

// const apiUrl = 'https://back-end-site-dra-camila.vercel.app/token';

$(function () {
  
  // fetch(apiUrl)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Ocorreu um erro na requisição.');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  // const {token} = data


  const url = `https://graph.instagram.com/me/media?access_token=IGQVJWWkYxUllrMHFJRTRqbTZApQl9IbkZAmU3ZABMW5GM1R2R2Y3elkxdHhUbXZA1Njg1WWhtT1ltYTMxdzc5QzY3ZA3BENFllUmFJaDRxcU93X1BhZADlMQ045czNiclZA3T3JRTm5wRHkybXotTHBWMXBvWgZDZD&fields=media_url,media_type,caption,permalink&limit=15`;
  
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
// });


