'use strict'

const $ = document
const container = $.querySelector('.container')

let itemElements
let itemElement
let userItems
let showNumberOfFollower    

let nameStyle /**  for short-code styles in ---> (state element in (show & hide))  */
let secondItemUserStyle  /**  for short-code styles in ---> (state element in (show & hide))  */
let imgUserStyle /**  for short-code styles in ---> (state element in (show & hide))  */
let detailUserStyle /**  for short-code styles in ---> (state element in (show & hide))  */

let count = 0

const users = [     /** userDB for make user list ( " you can make more than 3 ") */
              {id : 1 , 
               name : 'Hellen Jason',
               profileImage : 'url(../assets/img/profile_img/1.jpg)' , 
               lastPost : 'url(../assets/img/post_img/1.jpg)' ,
               followers : 1000,
               following : 20,
               posts : 100,
            },

              {id : 2 , 
               name : 'David Rock',
               profileImage : 'url(../assets/img/profile_img/2.jpg)' , 
               lastPost : 'url(../assets/img/post_img/2.jpg)' ,
               followers : 800,
               following : 200,
               posts : 40,
            },

              {id : 3 , 
               name : 'Rosa Mock',
               profileImage : 'url(../assets/img/profile_img/3.jpg)', 
               lastPost : 'url(../assets/img/post_img/3.jpg)',
               followers : 2000,
               following : 100,
               posts : 200,
            },
            ] 

const counter = (element , value) => {

    if(element.innerHTML == ''){

            showNumberOfFollower = setInterval(() => {

            if(!(count >= value)) {

                element.innerHTML = count
            }else{
                
                clearInterval(showNumberOfFollower)

                if(value >= 1000) {

                    element.innerHTML = String(value)[0]+'K'
                }else {

                     element.innerHTML = value
                }
            }

            if (count >= 30) {
                count += +30
            }else if(count >= 90) {
                count += +90
            }else if(count >= 900) {
                count += +900
            }else if(count >= 9000) {
                count += +9000
            }

            ++count

        }, 25);
    }
}

const stateElementInShow = (target) => {

    nameStyle = target.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style
    secondItemUserStyle = target.firstElementChild.nextElementSibling.style
    imgUserStyle = target.firstElementChild.firstElementChild.style
    detailUserStyle = target.firstElementChild.firstElementChild.nextElementSibling.style

    target.style.flexGrow = 1
    target.firstElementChild.style.width = '48%'

    nameStyle.transform = 'rotate(0deg)'
    nameStyle.top = '10%'
    nameStyle.width = '100%'
    nameStyle.right = '0%'

    secondItemUserStyle.display = 'flex'
    secondItemUserStyle.width = '48%'

    imgUserStyle.height = '65%'
    imgUserStyle.borderBottomRightRadius = '50%'

    detailUserStyle.height = '35%'
    detailUserStyle.alignItems = 'center'

    setTimeout(() => {

        target.firstElementChild.nextElementSibling.style.opacity = '100%'
        target.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style.fontSize = '2.5rem'
        target.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.style.display = 'block'
       
        count = 0
        let followerElement = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild
        let followerCount = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.dataset.followers
        counter(followerElement , followerCount)
        
        let followingElement = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild
        let followingCount = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.dataset.following
        counter(followingElement , followingCount)

        let postElement = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild
        let postCount = target.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.dataset.posts
        counter(postElement , postCount)

    }, 300);
}

const stateElementInHide = (target) => {

    nameStyle = target.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.style
    secondItemUserStyle = target.firstElementChild.nextElementSibling.style
    imgUserStyle = target.firstElementChild.firstElementChild.style
    detailUserStyle = target.firstElementChild.firstElementChild.nextElementSibling.style

    target.style.flexGrow = 0
    target.firstElementChild.style.width = ''

    nameStyle.transform = 'rotate(-90deg)'
    nameStyle.top = '41%'
    nameStyle.width = '170px'
    nameStyle.right = '0%'

    secondItemUserStyle.display = 'none'
    secondItemUserStyle.width = '0%'

    imgUserStyle.height = '60%'
    imgUserStyle.borderBottomRightRadius = '0%'

    detailUserStyle.height = '40%'
    detailUserStyle.alignItems = 'center'

    secondItemUserStyle.opacity = '0%'
    nameStyle.fontSize = '1.8rem'
    target.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.style.display = 'none'
}

const funcElement = (e , items) => {

    items.forEach(Element => {

        if (Element == e) {

            stateElementInShow(e)
        }else{

            stateElementInHide(Element)
        }
    })
}

const actionSlide = (e) => {

    if(e.style.flexGrow != 1){

        funcElement(e , userItems)
    }
}

users.forEach (Element => {

    itemElement = $.createElement('div')
 
    const user = `<div class="user" onclick="actionSlide(this)">
                       <div class="firstItemUser">
                           <div class="imgUser" style="background-image:${Element.profileImage}"></div>
                           <div class="detailUser">
                               <div class="name">${Element.name}</div>
                               <button class="followBtn">follow</button>
                           </div>
                       </div>
                       <div class="secondItemUser">
                           <div class="containerDetailProfile">
                               <div class="detailProfile">
                                   <div class="profItem">
                                       <div class="number" data-followers="${Element.followers}"></div>
                                       <div class="title">Followers</div>
                                   </div>
                                   <div class="profItem">
                                       <div class="number" data-following="${Element.following}"></div>
                                       <div class="title">Following</div>
                                   </div>
                                   <div class="profItem">
                                       <div class="number" data-posts="${Element.posts}"></div>
                                       <div class="title">Posts</div>
                                   </div>
                               </div>
                           </div>
                           <div class="posts" style="background-image:${Element.lastPost}">
                               <button class="goToPageBtn">Go to page</button>
                           </div>
                       </div>
                   </div>`

    container.insertAdjacentHTML('afterbegin' , user)
})

userItems= $.querySelectorAll('.user')
container.lastElementChild.style.flexGrow = 1
stateElementInShow(container.lastElementChild)