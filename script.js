let switchButton = document.getElementById('switch'); 
let modeLight = document.getElementById('light-button')
let modeDark = document.getElementById('dark-button')
const slider = document.getElementById('slider')
let wrapper = document.getElementsByClassName('card-wrapper')

// Consuming the Instagram API
function getInstagramUserInfo(access_token) {
    fetch(`https://graph.instagram.com/me?fields=username,followers_count&access_token=${access_token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const followerCount = data.followers_count !== undefined ? data.followers_count : '028';

            document.getElementById('instauname').innerHTML = data.username || 'Default Username';
            document.getElementById('instafollowcount').innerHTML = followerCount;
            document.querySelector('.today-update').innerHTML = '002 Today';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // If there's an error, set default values for username and follower count
            document.getElementById('instauname').innerHTML = 'KavathaDaniel';
            document.getElementById('instafollowcount').innerHTML = '028';
            document.querySelector('.today-update').innerHTML = '002 Today';
        });
}

// Call the function with your access token
const access_token = 'IGQWRPWW1kM1dtM0lMMlI3TC1rbTN3MDRySDRGVFk2aEFnWjVvNXVzX0JQOWU4UFdCSWJZAUHJSa3plLW5qdklhTkJZAMzJ1TWJ5YVBuQk1MV0NqRThzNjdTN2psczdMTmU5dXBjNUp3QkdiRXJwVVNKVmNlN1pfM0EZD';
getInstagramUserInfo(access_token);

// Consuming the GitHub API
async function getGitHubFollowerCount(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        const followerCount = userData.followers;
        document.getElementById('fbuname').innerHTML = `${username}`;
        document.getElementById('fbfollow').innerHTML = userData.followers;

        console.log(`The follower count of ${username} on GitHub is: ${followerCount}`);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const username = 'daniel-kav';
getGitHubFollowerCount(username);

// Handling the header using the db.json file
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const headerData = data.header;
    document.getElementById('header').innerHTML = `
      <div class="header">
          <h1 class="title light">${headerData.title}</h1>
          <p class="total-followers">Total Followers: ${headerData.total_followers}</p>
          <hr class="solid">
        </div>`
  })
  .catch(error => {
    console.error('Error fetching header data:', error);
  });

// Consuming the db.json file for card data
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const cards = data.cards;
    const overviewToday = data.overview_today;

    // Filter the data to get the specific card
    const twitterCard = cards.find(card => card.platform === 'twitter');
    const instagramCard = cards.find(card => card.platform === 'instagram');
    const facebookCard = cards.find(card => card.platform === 'facebook');
    const youtubeCard = cards.find(card => card.platform === 'youtube');
    
    // Use the Twitter card data as needed
    document.getElementById('twitteruname').innerHTML = twitterCard.username;
    document.getElementById('twittercount').innerHTML = twitterCard.follower_count;
    document.getElementById('twitterupdate').innerHTML = twitterCard.today_update;

    // Using the Instagram card data
    // document.getElementById('instauname').innerHTML = instagramCard.username;
    // document.getElementById('instafollowcount').innerHTML = instagramCard.follower_count;
    
    document.getElementById('instaupdate').innerHTML = instagramCard.today_update;

    // Using the YouTube card data
    document.getElementById('ytuname').innerHTML = youtubeCard.username;
    document.getElementById('ytfollow').innerHTML = youtubeCard.follower_count;
    document.getElementById('ytupdate').innerHTML = youtubeCard.today_update;

    // Using the overview today data
    const pageviews = overviewToday[1];
    document.getElementById('fbupdate').innerHTML = pageviews.update;
    document.getElementById('fbchange').innerHTML = pageviews.percent_change;
  })
  .catch(error => {
    console.error('Error fetching card data:', error);
  });

// Dark/Light mode toggle
function changeMode(){
    if(modeLight.classList.contains('show')){
        modeLight.classList.remove('show')
        modeLight.classList.add('none')
        modeDark.classList.add('show')
        slider.style.backgroundColor = 'var(--LimeGreen)'
        bodyModeChange()

    } else if (modeDark.classList.contains('show')){
        modeDark.classList.remove('show')
        modeLight.classList.remove('none')
        modeLight.classList.add('show')
        slider.style.backgroundColor = '#ccc'
        bodyModeChange()
    }

}
switchButton.addEventListener('change', changeMode, bodyModeChange)

function bodyModeChange (){
    if(modeDark.classList.contains('show')){
        document.body.style.backgroundColor = 'var(--VeryDarkBlueBG)'
        darkCardMode()
        
    } else if (modeLight.classList.contains('show')){
        document.body.style.backgroundColor = 'var(--WhiteBG)'
        lightCardMode()
        
    }
}

function changeColors(selectors, colors) {
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        for(i=0; i<elements.length;i++){
            elements[i].style.backgroundColor = colors;
        }
    })
}

function changeTextColors(selectors, colors) {
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        for(i=0; i<elements.length;i++){
            elements[i].style.color = colors;
        }
    })
}
  
function darkCardMode(){
    changeColors(['.card-inner','.card-inner-2'], ['var(--DarkDesaturtedBlueCardBG)'])
    changeTextColors(['.followers-number', '.title', '.page-update', '.attribution'],['var(--WhiteText)'])
}

function lightCardMode(){
    changeColors(['.card-inner','.card-inner-2'], ['var(--VeryPaleBlueTopBGPattern)'])
    changeTextColors(['.followers-number', '.title', '.page-update'],['var(--VeryDarkBlueText)'])
}
