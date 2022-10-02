const gt_button = document.querySelector(".get-thumb");
const url_info = document.querySelector(".url-info");
const yt_url = document.querySelector(".yt-url");
const img_holder = document.querySelector(".img-holder");
const test_yt_img = document.createElement('img');
// const yt_img = document.querySelector(".th-preview");
const row = document.querySelector(".row");
const section_download = document.querySelector(".section-download");
const btns_download_set = document.querySelector(".btns-download-set");
const res = ["maxresdefault", "hqdefault", "sddefault", "mqdefault"];

const loading_anim = document.querySelector(".loading-anim");

const max_button = document.querySelector(".btn-max");
const high_button = document.querySelector(".btn-high");
const std_button = document.querySelector(".btn-std");
const med_button = document.querySelector(".btn-med");

const button_elements = [max_button, high_button, std_button, med_button];

gt_button.addEventListener('click', function (e) {
    e.preventDefault();
    gt_button.textContent = "Loading";
    while (img_holder.firstChild)
    {
        img_holder.removeChild(img_holder.lastChild);
    }


    for (i = 0; i < button_elements.length - 1; i++)
    {
        button_elements[i].style.display = "none";
    }

    let vid_id = extractId(yt_url.value);
    const mq_url = `https://i.ytimg.com/vi/${vid_id}/mqdefault.jpg`

    if (imageExists(mq_url))
    {
        const img_urls = [];
        url_info.style.display = "none";
        let k = 0;

        for (i = 0; i < res.length; i++)
        {
            let template_test = `https://i.ytimg.com/vi/${vid_id}/${res[k]}.jpg`;

            if (imageExists(template_test))
            {

                img_urls.push(template_test);
                button_elements[k].target = '_blank';
                button_elements[k].href = template_test;
                button_elements[k].style.display = "inline-block";
            }
            k++;
        }

        const yt_img = document.createElement('img');
        yt_img.src = img_urls[0];
        yt_img.classList.add('th-preview');
        img_holder.appendChild(yt_img);
        section_download.style.display = "block";
        gt_button.textContent = "get thumb";
    }
    else
    {
        gt_button.textContent = "get thumb";
        const errDia = document.querySelector(".errDia");
        const err = document.createElement('p');
        err.textContent = "Invalid URL";
        errDia.append(err);
        setTimeout(() => {
            err.textContent = "";
        }, 2000)
    }



})

const extractId = function (url) {

    const startIndex = url.length - 11;
    const endIndex = url.length;
    const vidId = url.slice(startIndex, endIndex);
    return vidId;
}

const imageExists = function (url) {
    // test_yt_img.src = url;
    // if (test_yt_img.width !== 0)
    // {
    //     console.log(test_yt_img.naturalWidth);
    //     return true;
    // }
    // else
    //     return false;
    var http = new XMLHttpRequest();

    try
    {
        http.open('HEAD', `https://corsproxy.io/?${url}`, false);
        // http.setHeader("Access-Control-Allow-Origin", "*");
        // http.setHeader("Access-Control-Allow-Credentials", "true");
        // http.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        // http.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


        http.send();

        if (http.status === 200)
        {
            return true;
        }
        else if (http.onerror)
        {
            return false;
        }
        else
        {
            return false;
        }
    }
    catch (DOMException)
    {
        return false;
    }

}